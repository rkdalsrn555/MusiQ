import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  & h1 {
    font-size: 2rem;
  }

  & p {
    font-size: 2rem;
  }
`;

export const MultiGameHint = () => (
  <Container>
    <h1>HINT - </h1>
    <p>가수힌트 ㅈㅊㄷ</p>
  </Container>
);
