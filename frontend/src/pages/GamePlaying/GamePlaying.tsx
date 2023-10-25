import React, { useState } from 'react';
import {
  OptionBox,
  DancingChick,
  AnswerInput,
  HeartGauge,
  ChanceGauge,
  PlayBtn,
  NoIdeaBtn,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import * as S from './GamePlaying.styled';

const playBtnList = [
  {
    btnName: '처음',
    onClickHandler: () => {
      console.log('처음 클릭했다');
    },
  },
  {
    btnName: '중간',
    onClickHandler: () => {
      console.log('처음 클릭했다');
    },
  },
  {
    btnName: '끝',
    onClickHandler: () => {
      console.log('처음 클릭했다');
    },
  },
];

export const GamePlaying = () => {
  const [lives, setLives] = useState<number>(3);
  const [chanceCnt, setChanceCnt] = useState<number>(3);

  return (
    <S.Container>
      <BackBtn url="/guest/game-option" />
      <div className="emptyBox" />
      <S.MiddleContainer>
        <DancingChick />
        <AnswerInput />
        <S.PlayingBtnBoxPosition>
          {playBtnList.map((item) => (
            <PlayBtn
              btnName={item.btnName}
              onClickHandler={item.onClickHandler}
              key={item.btnName}
            />
          ))}
          {/* <NoIdeaBtn /> */}
        </S.PlayingBtnBoxPosition>
      </S.MiddleContainer>
      <S.RightSideContainer>
        <S.TopRightSideContainer>
          <OptionBox />
          <HeartGauge lives={lives} />
        </S.TopRightSideContainer>
        <S.bottomRightSideContainer>
          <ChanceGauge chanceCnt={chanceCnt} />
        </S.bottomRightSideContainer>
      </S.RightSideContainer>
    </S.Container>
  );
};
