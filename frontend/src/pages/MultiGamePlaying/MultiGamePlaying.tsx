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

export const MultiGamePlaying = () => {
  const location = useLocation();
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Container>
        <MultiGameStatus />
        <MultiDancingChick />
        <MultiGameHint />
        <MultiGameSkip />
        <MultiGameChatting />
      </S.Container>
    </motion.div>
  );
};
