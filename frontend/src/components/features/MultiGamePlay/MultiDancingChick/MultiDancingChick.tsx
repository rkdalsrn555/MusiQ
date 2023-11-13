import React from 'react';
import styled from 'styled-components';
import dancingChick from '../../../../assets/img/playgame/danceChick.gif';

const Container = styled.div`
  width: 29rem;
  height: 20rem;
`;

export const MultiDancingChick = () => (
  <Container>
    <img src={dancingChick} alt="춤추는병아리" width={200} height={200} />
  </Container>
);
