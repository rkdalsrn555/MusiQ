import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .hintTitle {
    font-size: 1.2rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }

  & .hintContent {
    font-size: 1.2rem;
  }
`;

type OwnProps = {
  initialHint: string;
  singerHint: string;
};

export const MultiGameHint = (props: OwnProps) => {
  const { initialHint, singerHint } = props;

  return (
    <Container>
      <h1>
        <span className="hintTitle">HINT - </span>
        <span className="hintContent">
          {initialHint === '' ? '곧 힌트가 나와요' : initialHint}
        </span>
      </h1>
      <p>
        <span className="hintTitle">가수힌트 - </span>
        <span className="hintContent">
          {singerHint === '' ? '곧 힌트가 나와요' : singerHint}
        </span>
      </p>
    </Container>
  );
};
