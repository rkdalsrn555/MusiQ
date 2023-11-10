import React from 'react';
import { motion } from 'framer-motion';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameProgress,
  MultiGameSkip,
  MultiDancingChick,
} from '../../components/features';
import * as S from './MultiGamePlaying.styled';

export const MultiGamePlaying = () => (
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
