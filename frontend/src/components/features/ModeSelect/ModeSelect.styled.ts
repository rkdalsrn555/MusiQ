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
  width: 40rem;
  height: 27rem;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  bottom: 4rem;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  max-width: 20rem; // 버튼 간격을 조절
`;

export const RotatedImage = styled.img`
  transform: rotate(180deg);
`;
