import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  color: string;
  score: number;
  nickname: string;
};

const Container = styled.div`
  max-width: 15rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .score {
    font-weight: bold;
  }
`;

const CharactorColor = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.color};
  border-radius: 4px;
`;

export const GameUserData = (props: OwnProps) => {
  const { color, score, nickname } = props;

  return (
    <Container>
      <CharactorColor color={color} />
      <p className="score">{score}</p>
      <p>{nickname}</p>
    </Container>
  );
};
