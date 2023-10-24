import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const DancingChickPosition = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AnswerInputPosition = styled.div`
  position: absolute;
  top: 77%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HeartGaugePosition = styled.div`
  position: absolute;
  top: 25%;
  right: 5%;
`;

export const ChanceGaugePosition = styled.div`
  position: absolute;
  bottom: 25%;
  right: 5%;
`;

export const PlayingBtnBoxPosition = styled.div`
  position: absolute;
  bottom: 6%;
  right: 5%;
  width: 30rem;
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
`;
