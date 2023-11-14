import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.3rem;

  & .remainNum {
    font-size: 1.3rem;
  }

  & .explain {
    font-size: 1.6rem;
  }

  & .explainColor1 {
    color: #ff7539;
  }

  & .explainColor2 {
    color: #fb24ff;
  }

  & .time {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  & .hintTitle {
    font-size: 1.2rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }

  & .hintContent {
    font-size: 1.2rem;
  }

  & .bold {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }
`;

type OwnProps = {
  answerData: { title: string; singer: string };
  remainMusic: number;
  totalMusic: number;
  initialHint: string;
  singerHint: string;
  time: number;
};

export const MultiGameHint = (props: OwnProps) => {
  const { initialHint, singerHint, time, remainMusic, totalMusic, answerData } =
    props;

  return (
    <Container>
      <p className="remainNum">
        <span className="bold">남은곡</span> [ {remainMusic} / {totalMusic} ]
      </p>
      <p className="explain bold">
        <span className="explain bold explainColor1">음악</span>을 듣고{' '}
        <span className="explain bold explainColor2">답</span>을 입력하세요.
      </p>
      <p className="time">- {time} 초 -</p>
      {answerData.title === '' ? (
        <>
          <p>
            <span className="hintTitle">가수힌트 - </span>
            <span className="hintContent">
              {singerHint === '' ? '곧 힌트가 나와요' : singerHint}
            </span>
          </p>
          <p>
            <span className="hintTitle">초성힌트 - </span>
            <span className="hintContent">
              {initialHint === '' ? '곧 힌트가 나와요' : initialHint}
            </span>
          </p>
        </>
      ) : (
        <p className="hintTitle">
          정답! {answerData.title} - {answerData.singer}
        </p>
      )}
    </Container>
  );
};
