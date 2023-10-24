import React from 'react';
import {
  OptionBox,
  DancingChick,
  AnswerInput,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import * as S from './GamePlaying.styled';

export const GamePlaying = () => (
  <S.Container>
    <BackBtn url="/guest/game-option" />
    <OptionBox />
    <S.DancingChickPosition>
      <DancingChick />
    </S.DancingChickPosition>
    <S.AnswerInputPosition>
      <AnswerInput />
    </S.AnswerInputPosition>
  </S.Container>
);
