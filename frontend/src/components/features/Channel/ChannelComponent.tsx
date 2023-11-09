import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { Client, Stomp } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { websocketClientState } from '../../../atoms/atoms';

import { userApis } from '../../../hooks/api/userApis';
import { ChannelItemsWrapper, ChannelItem } from './ChannelComponent.styled';

export const ChannelComponent = () => {
  const setWebsocketClient = useSetRecoilState(websocketClientState);
  const [channelSizes, setChannelSizes] = useState([]);
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem('userAccessToken');

  const handleChannelClick = (channelNumber: number) => {
    if (accessToken) {
      const ws = new WebSocket('ws://localhost:8080/api/game-websocket');

      const client = new Client({
        webSocketFactory: () => ws,
        connectHeaders: {
          accessToken,
          channelNo: String(channelNumber),
        },
        onConnect: () => {
          console.log(`Connected to channel ${channelNumber}`);
          client.subscribe(`/topic/${channelNumber}`, (message) => {
            // 서버로부터 메시지를 받았을 때 처리할 로직
            console.log('Received message', message.body);
          });
          setWebsocketClient(client); // Recoil 상태 설정
          navigate(`/multi/${channelNumber}/lobby`); // 채널로 이동
        },
        onStompError: (frame) => {
          console.error('STOMP Error:', frame.headers.message);
        },
      });

      client.activate(); // 클라이언트 활성화
    } else {
      console.error('Access token is not available.');
    }
  };
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
