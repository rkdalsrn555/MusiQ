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

export const MultiGameSkip = () => (
  <Container>
    <h1>SKIP - </h1>
    <p>3</p>
  </Container>
);
