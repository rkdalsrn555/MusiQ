/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  & p {
    font-size: 1.3rem;

    & .bold {
      font-family: 'Galmuri11', 'sans-serif';
      font-weight: bold;
    }
  }
`;

type OwnProps = {
  gameStatus: boolean;
};

export const MultiGameSkip = (props: OwnProps) => {
  const { gameStatus } = props;

  return (
    <Container>
      {gameStatus ? (
        <div>
          <p>
            [ <span className="bold"> .</span> 하나만 입력하거나,{' '}
            <span className="bold">.</span> 키를 누르면 스킵투표가 됩니다. ]
          </p>
        </div>
      ) : (
        <p>[ 방장이 게임 시작을 누르면 게임이 시작됩니다. ]</p>
      )}
    </Container>
  );
};
