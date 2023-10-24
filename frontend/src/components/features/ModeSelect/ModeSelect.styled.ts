import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

export const Box = styled(motion.div)`
  width: 54rem;
  height: 30rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 2.5rem;
  position: absolute;
  top: 9.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
  box-shadow:
    0 0.125rem 0.1875rem rgba(0, 0, 0, 0.1),
    0 0.625rem 1.25rem rgba(0, 0, 0, 0.06);

  &.sideContent {
    opacity: 0.5; // 투명도 조절
    position: absolute;
    left: ${(props) => (props.custom ? '54rem' : '-54rem')}; // 위치 조절
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  bottom: 4rem;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 20rem;

  button:nth-child(1) {
    position: absolute;
    left: -5rem;
  }

  button:nth-child(3) {
    position: absolute;
    right: -5rem;
  }
`;

export const RotatedImage = styled.img`
  transform: rotate(180deg);
`;

export const StyledImage = styled.img`
  width: 54rem;
  height: 30rem;
  border-radius: 2.5rem;
`;
