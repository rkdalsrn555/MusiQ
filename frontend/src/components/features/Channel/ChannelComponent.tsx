import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChannelItemsWrapper, ChannelItem } from './ChannelComponent.styled';

export const ChannelComponent = () => {
  const [channelSizes, setChannelSizes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('userAccessToken');
    if (!accessToken) {
      console.error('Access token is not available.');
      return;
    }

    const fetchChannelSizes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/game`,
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
    navigate(`/multi/${channelNumber}/lobby`);
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
            채널 {channelNumber} 인원수 {size}/100
          </ChannelItem>
        );
      })}
    </ChannelItemsWrapper>
  );
};
