import React, { useState } from 'react';
import {
  OptionBox,
  DancingChick,
  AnswerInput,
  HeartGauge,
  ChanceGauge,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import * as S from './GamePlaying.styled';

export const GamePlaying = () => {
  const [lives, setLives] = useState<number>(3);
  const [chanceCnt, setChanceCnt] = useState<number>(3);

  return (
    <S.Container>
      <BackBtn url="/guest/game-option" />
      <OptionBox />
      <S.DancingChickPosition>
        <DancingChick />
      </S.DancingChickPosition>
      <S.AnswerInputPosition>
        <AnswerInput />
      </S.AnswerInputPosition>
      <S.HeartGaugePosition>
        <HeartGauge lives={lives} />
      </S.HeartGaugePosition>
      <S.ChanceGaugePosition>
        <ChanceGauge chanceCnt={chanceCnt} />
      </S.ChanceGaugePosition>
    </S.Container>
  );
};
