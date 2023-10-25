import React from 'react';
import styled from 'styled-components';
import battery1Chance from '../../../../assets/img/playgame/battery1life.png';
import battery2Chance from '../../../../assets/img/playgame/battery2life.png';
import battery3Chance from '../../../../assets/img/playgame/battery3life.png';
import headset from '../../../../assets/img/playgame/headset.png';

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const batteryChanceArray = [battery1Chance, battery2Chance, battery3Chance];

export const ChanceGauge = ({ chanceCnt }: { chanceCnt: number }) => (
  <Container>
    <img src={headset} alt="헤드셋" width={70} height={60} />
    <img
      src={batteryChanceArray[chanceCnt - 1]}
      alt="배터리"
      width={100}
      height={60}
    />
  </Container>
);
