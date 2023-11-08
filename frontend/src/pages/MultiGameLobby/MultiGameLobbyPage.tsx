import React, { useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { Client, Stomp } from '@stomp/stompjs';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export const MultiGameLobbyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const channelNumber = location.pathname.split('/').slice(-2)[0];
  let stompClient: Client | null = null; // Stomp 클라이언트 객체 변수

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }

    // 페이지 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 구독 설정
    const initializeStompClient = () => {
      if (stompClient) {
        // 이미 설정된 클라이언트가 있으면 반환
        return stompClient;
      }

      const ws = new WebSocket('ws://localhost:8080/api/game-websocket');
      const accessToken = window.localStorage.userAccessToken; // 액세스 토큰 설정
      if (!accessToken) {
        console.error('Access token is not available.');
        return null;
      }

      stompClient = new Client({
        webSocketFactory: () => ws,
        connectHeaders: {
          accessToken,
          channelNo: String(channelNumber),
        },
      });

      stompClient.activate();

      stompClient.onConnect = () => {
        // 연결 후, 채널 구독 설정
        const channelNo = channelNumber;
        const subscription = stompClient!.subscribe(
          `/topic/${channelNo}`,
          (message) => {
            // 메시지를 받았을 때의 처리
            const payload = JSON.parse(message.body);
            console.log('Received message:', payload);
          }
        );
      };

      return stompClient; // 클라이언트 객체 반환
    };

    const existingStompClient = initializeStompClient();

    // 페이지를 나갈 때 실행되는 함수
    return () => {
      if (existingStompClient) {
        existingStompClient.deactivate(); // Stomp 클라이언트를 닫음
        console.log('나갔다');

        // 페이지를 나갈 때 HTTP POST 요청 보내기
        const accessToken = window.localStorage.userAccessToken;
        if (!accessToken) {
          console.error('Access token is not available.');
          return;
        }

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
          .then((response: any) => {
            console.log('HTTP POST response:', response.data);
          })
          .catch((error: any) => {
            console.error('HTTP POST error:', error);
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
