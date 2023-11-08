import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { Client, Stomp } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../../hooks/api/userApis';
import { ChannelItemsWrapper, ChannelItem } from './ChannelComponent.styled';

export const ChannelComponent = () => {
  const [channelSizes, setChannelSizes] = useState([]);
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem('userAccessToken');

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is not available.');
      return;
    }

    const fetchChannelSizes = async () => {
      try {
        const response = await userApis.get(
          `${process.env.REACT_APP_BASE_URL}/game/channel`,
          {
            headers: {
              accessToken,
            },
          }
        );
        if (response.status === 200) {
          setChannelSizes(response.data.data.channelSizes);
        }
      } catch (error) {
        console.error('공습경보', error);
      }
    };

    fetchChannelSizes();
  }, []);

  const handleChannelClick = (channelNumber: number) => {
    // WebSocket 연결 및 채널 구독
    const ws = new WebSocket('ws://localhost:8080/api/game-websocket');
    if (accessToken === null) {
      console.error('Access token is not available.');
      return;
    }
    const client = new Client({
      webSocketFactory: () => ws,
      connectHeaders: {
        accessToken,
        channelNo: String(channelNumber),
      },
    });

    client.activate();
    console.log(channelNumber);

    client.onConnect = () => {
      // 연결 후, 채널 구독
      const channelNo = channelNumber;
      const subscription = client.subscribe(
        `/topic/${channelNo}`,
        (message) => {
          // 메시지를 받았을 때의 처리
          const payload = JSON.parse(message.body);
          console.log('Received message:', payload);
        }
      );

      // 채널로 이동
      navigate(`/multi/${channelNumber}/lobby`);
    };
  };

  return (
    <ChannelItemsWrapper>
      {channelSizes.map((size, index) => {
        const channelNumber = index + 1;
        return (
          <ChannelItem
            key={`channel-${channelNumber}`}
            onClick={() => handleChannelClick(channelNumber)}
          >
            <p
              style={{ fontSize: '28px', color: '#E08080', marginRight: '5%' }}
            >
              채널 {channelNumber}{' '}
            </p>
            <p>인원수 {size}/100</p>
          </ChannelItem>
        );
      })}
    </ChannelItemsWrapper>
  );
};
