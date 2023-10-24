import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Box = styled(motion.div)`
  width: 54rem;
  height: 30rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
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
