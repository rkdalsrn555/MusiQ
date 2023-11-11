import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameProgress,
  MultiGameSkip,
  MultiDancingChick,
} from '../../components/features';
import * as S from './MultiGamePlaying.styled';

type OwnProps = {
  socketClient: React.MutableRefObject<any>;
  topicNumber: React.MutableRefObject<number>;
};

export const MultiGamePlaying = (props: OwnProps) => {
  const { socketClient, topicNumber } = props;
  const location = useLocation();
  const accessToken = window.localStorage.getItem('userAccessToken');

  const sendMessage = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${topicNumber.current}`,
      headers,
      body: JSON.stringify({
        messageType: 'CHAT',
        message: '나는메시지당',
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
          메세지보내기!
        </button>
        <MultiGameStatus />
        <MultiDancingChick />
        <MultiGameHint />
        <MultiGameSkip />
        <MultiGameChatting />
      </S.Container>
    </motion.div>
  );
};
