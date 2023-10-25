import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
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

const FirstMusicStartTime = 0;
const SecondMusicStartTime = 60;
const ThirdMusicStartTime = 120;

export const GamePlaying = () => {
  const [lives, setLives] = useState<number>(3);
  const [chanceCnt, setChanceCnt] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<ReactPlayer>(null);

  // 버튼 누르면 게임 플레을 실행시키는 함수
  const playMusic = (musicStartTime: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(musicStartTime);
      setIsPlaying(true);
    }
  };

  // 몇 초 뒤에 멈출 지 설정해주는 함수
  const stopAfterSecond = (second: number) => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, second);
    }
  };

  const playBtnList = [
    {
      btnName: '처음',
      onClickHandler: () => {
        playMusic(FirstMusicStartTime);
      },
    },
    {
      btnName: '중간',
      onClickHandler: () => {
        playMusic(SecondMusicStartTime);
      },
    },
    {
      btnName: '끝',
      onClickHandler: () => {
        playMusic(ThirdMusicStartTime);
      },
    },
  ];

  // 버튼 한번 누르면 비활성화 시키고, 배터리 한개 감소시켜야함

  return (
    <S.Container>
      <BackBtn url="/guest/game-option" />
      <ReactPlayer
        url="https://www.youtube.com/watch?v=VYaC6N4ihDQ"
        controls
        playing={isPlaying}
        onPlay={() => {
          stopAfterSecond(1000);
        }}
        width="0"
        height="0"
        ref={videoRef}
      />
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
