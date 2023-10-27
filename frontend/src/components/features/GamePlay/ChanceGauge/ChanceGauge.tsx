import React from 'react';
import styled from 'styled-components';
import battery0Chance from '../../../../assets/img/playgame/battery0life.png';
import battery1Chance from '../../../../assets/img/playgame/battery1life.png';
import battery2Chance from '../../../../assets/img/playgame/battery2life.png';
import battery3Chance from '../../../../assets/img/playgame/battery3life.png';
import headset from '../../../../assets/img/playgame/headset.png';

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const batteryChanceArray = [
  battery0Chance,
  battery1Chance,
  battery2Chance,
  battery3Chance,
];

export const ChanceGauge = ({ chanceCnt }: { chanceCnt: number }) => (
  <Container>
    <img src={headset} alt="헤드셋" width={60} height={50} />
    <img
      src={batteryChanceArray[chanceCnt]}
      alt="배터리"
      width={90}
      height={50}
    />
  </Container>
);
