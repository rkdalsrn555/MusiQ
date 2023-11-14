import React from 'react';
import styled from 'styled-components';
import dancingChick from '../../../../assets/img/playgame/danceChick.gif';

const Container = styled.div`
  position: absolute;
  top: -100px;
  right: 0;

  &img {
    display: block;
    margin: 0 auto;
  }
`;

export const MultiDancingChick = () => (
  <Container>
    <img src={dancingChick} alt="춤추는병아리" width={100} height={100} />
  </Container>
);
