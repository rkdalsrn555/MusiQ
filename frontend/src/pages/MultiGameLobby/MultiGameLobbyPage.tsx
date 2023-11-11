import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-unresolved
import { Client, Stomp } from '@stomp/stompjs';
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
  const accessToken = window.localStorage.getItem('userAccessToken');

  useEffect(() => {
    // 모바일 기기 접근을 막는 로직
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }

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
            console.log('Received message', message.body);
          });

          client.subscribe(`/chat-message/${channelNumber}`, (message) => {
            console.log('채팅메시지', message);
          });
          navigate(`/multi/${channelNumber}/lobby`);
        },
        onStompError: (frame) => {
          console.error('STOMP Error:', frame.headers.message);
        },
      });

      client.activate(); // 클라이언트 활성화
    } else {
      console.error('Access token is not available.');
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
          <ButtonsWrapper>
            <LobbyCreateRoomButton />
          </ButtonsWrapper>
          <LobbyChatting />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
