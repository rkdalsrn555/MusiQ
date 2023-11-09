import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { websocketClientState } from '../../atoms/atoms';
import { userApis } from '../../hooks/api/userApis';
import {
  LobbyButtons,
  LobbyChatting,
  LobbyRooms,
  LobbyUsersList,
  RefreshButton,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import { LobbyWrapper, MulitBackGround } from './MultiGameLobby.styled';

export const MultiGameLobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const websocketClient = useRecoilValue(websocketClientState);
  const channelNumber = location.pathname.split('/').slice(-2)[0];

  useEffect(() => {
    // 모바일 기기 접근을 막는 로직
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }

    // 이미 활성화된 WebSocket 클라이언트를 확인하고 재사용
    if (!websocketClient) {
      console.error(
        'No active WebSocket client. Redirecting to channel selection.'
      );
      navigate('/multi/channel'); // 웹소켓 클라이언트가 없으면 채널 선택으로 리다이렉트
    }

    // 페이지를 떠날 때 WebSocket 연결을 종료
    return () => {
      if (websocketClient) {
        websocketClient.deactivate();
        console.log(`Disconnected from channel ${channelNumber}`);
      }
      // 서버에 사용자가 채널을 떠남
      const accessToken = window.localStorage.getItem('userAccessToken');
      if (accessToken) {
        userApis
          .post(
            `${process.env.REACT_APP_BASE_URL}/game/${channelNumber}`,
            {},
            {
              headers: {
                accessToken,
              },
            }
          )
          .then((response) => {
            console.log('Left channel successfully.', response.data);
          })
          .catch((error) => {
            console.error('Error leaving channel.', error);
          });
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <MulitBackGround>
        <LobbyWrapper>
          <RefreshButton />
          <BackBtn url="/multi/channel" />
          <LobbyUsersList />
          <LobbyRooms />
          <LobbyButtons />
          <LobbyChatting />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
