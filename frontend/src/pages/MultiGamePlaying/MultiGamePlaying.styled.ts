import styled from 'styled-components';
import backgroundGif1 from '../../assets/img/background/backgroundGif1.gif';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundGif1});
  background-size: cover;
`;

export const MCPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 38rem;
`;

export const BubblePosition = styled.div``;
