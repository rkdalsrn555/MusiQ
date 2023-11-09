import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { websocketClientState } from '../../atoms/atoms';
import { userApis } from '../../hooks/api/userApis';
import {
  LobbyCreateRoomButton,
  LobbyChatting,
  LobbyRooms,
  LobbyUsersList,
  RefreshButton,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import {
  LobbyWrapper,
  MulitBackGround,
  ButtonsWrapper,
} from './MultiGameLobby.styled';

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
      // 비동기 함수를 선언합니다.
      const deactivateClient = async () => {
        if (websocketClient) {
          try {
            // deactivate가 Promise를 반환한다고 가정하고 await 키워드를 사용합니다.
            await websocketClient.deactivate();
            console.log(`Disconnected from channel ${channelNumber}`);
          } catch (error) {
            console.error('Error deactivating client:', error);
          }
        }

        // 서버에 사용자가 채널을 떠남을 알립니다.
        const accessToken = window.localStorage.getItem('userAccessToken');
        if (accessToken) {
          try {
            const response = await userApis.post(
              `${process.env.REACT_APP_BASE_URL}/game/${channelNumber}`,
              {},
              {
                headers: {
                  accessToken,
                },
              }
            );
            console.log('Left channel successfully.', response.data);
          } catch (error) {
            console.error('Error leaving channel:', error);
          }
        }
      };

      // 비동기 함수를 실행합니다.
      deactivateClient();
    };
  }, [websocketClient, channelNumber]);

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
          <ButtonsWrapper>
            <LobbyCreateRoomButton />
          </ButtonsWrapper>
          <LobbyChatting />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
