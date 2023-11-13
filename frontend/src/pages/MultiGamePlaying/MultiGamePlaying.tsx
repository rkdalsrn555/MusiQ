import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameProgress,
  MultiGameSkip,
  MultiDancingChick,
} from '../../components/features';
import * as S from './MultiGamePlaying.styled';

type GameChatType = {
  nickname: string;
  message: string;
};

export const MultiGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';
  const client = useRef<any>({});
  const [gameChatList, setGameChatList] = useState<GameChatType[]>([]);
  const gameRoomNumber = Number(location.pathname.split('/')[4]);

  useEffect(() => {
    // 모바일 기기 접근을 막는 로직
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  // 구독
  const subscribe = () => {
    client.current.subscribe(`/topic/${gameRoomNumber}`, (message: any) => {
      const msg = JSON.parse(message.body);
      console.log(msg);
      setGameChatList((prev) => [
        ...prev,
        { nickname: msg.nickname, message: msg.message },
      ]);
    });
  };

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        accessToken,
        channelNo: String(gameRoomNumber),
      },
      onConnect: subscribe,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers.message);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const sendMessage = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    client.current.publish({
      destination: `/chat-message/${gameRoomNumber}`,
      headers,
      body: JSON.stringify({
        message: '바보',
        nickname: '장충동왕족발보쌈',
      }),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Container>
        <button type="button" onClick={sendMessage}>
          버튼
        </button>
        <MultiGameStatus />
        <MultiDancingChick />
        <MultiGameHint />
        <MultiGameSkip />
        <MultiGameChatting gameChatList={gameChatList} socketClient={client} />
      </S.Container>
    </motion.div>
  );
};
