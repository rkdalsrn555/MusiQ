import React from 'react';
import styled from 'styled-components';
import { GameUserData } from './GameUserData';

const mockUserData = [
  { color: '#FF2828', score: 12, nickname: '장충동왕족발보쌈' },
  { color: '#28FFE5', score: 5, nickname: '소고기' },
  { color: '#87FF28', score: 6, nickname: '핑구' },
  { color: '#EE28FF', score: 4, nickname: '역삼불주먹' },
  { color: '#FFF628', score: 8, nickname: '이거보세요오' },
  { color: '#2865FF', score: 1, nickname: '노래맞추기장인' },
];

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 16rem;
  height: 15rem;
  border-radius: 16px;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(235, 226, 255, 0.6);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 14px;

  & h1 {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 4%;
  }

  & div {
    margin-left: 3%;
  }
`;

export const MultiGameStatus = () => (
  <Container>
    <h1>게임 현황</h1>
    {mockUserData.map((item) => (
      <GameUserData
        key={item.nickname}
        color={item.color}
        score={item.score}
        nickname={item.nickname}
      />
    ))}
  </Container>
);
