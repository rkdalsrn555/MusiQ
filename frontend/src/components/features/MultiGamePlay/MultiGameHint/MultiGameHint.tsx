import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  & .remainNum {
    font-size: 1.3rem;

    & span {
      font-size: 1.3rem;
    }
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

  & .bold {
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }

  & .answer {
    padding: 1rem;
    margin: 0 auto;
    width: fit-content;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    background-color: rgba(69, 237, 252, 0.8);
    font-size: 1.5rem;
    font-family: 'Galmuri11', 'sans-serif';
    font-weight: bold;
  }

  & .hintBox {
    padding: 1rem;
    margin: 0 auto;
    width: fit-content;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    background-color: rgba(238, 230, 79, 0.8);
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
  }
`;

type OwnProps = {
  winner: string;
  isResult: boolean;
  isMusicStart: boolean;
  answerData: { title: string; singer: string };
  remainMusic: number;
  totalMusic: number;
  initialHint: string;
  singerHint: string;
  time: number;
};

export const MultiGameHint = (props: OwnProps) => {
  const {
    winner,
    isResult,
    isMusicStart,
    initialHint,
    singerHint,
    time,
    remainMusic,
    totalMusic,
    answerData,
  } = props;

  return (
    <Container>
      {isResult ? (
        ''
      ) : (
        <>
          <p className="remainNum">
            <span className="bold">남은곡</span> [ {remainMusic} / {totalMusic}{' '}
            ]
          </p>
          <p className="explain bold">
            {winner !== '' || answerData.singer !== '' ? (
              <p className="explain bold">정답이 나왔습니다!</p>
            ) : (
              <div className="explain bold">
                {isMusicStart && time !== 0 ? (
                  <>
                    {' '}
                    <span className="explain bold explainColor1">음악</span>을
                    듣고 <span className="explain bold explainColor2">답</span>
                    을 입력하세요.
                  </>
                ) : (
                  `${time} 초 뒤에 노래가 나와요!`
                )}
              </div>
            )}
          </p>
          <p className="time">- {time} 초 -</p>
          {answerData.title === '' ? (
            <div className="hintBox">
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
            </div>
          ) : (
            <p className="answer">
              정답! {answerData.singer} - {answerData.title}
            </p>
          )}
        </>
      )}
    </Container>
  );
};
