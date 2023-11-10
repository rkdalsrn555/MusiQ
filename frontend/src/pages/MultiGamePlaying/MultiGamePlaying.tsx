import React from 'react';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameProgress,
  MultiGameSkip,
} from '../../components/features';
import * as S from './MultiGamePlaying.styled';

export const MultiGamePlaying = () => (
  <S.Container>
    <MultiGameStatus />
  </S.Container>
);
