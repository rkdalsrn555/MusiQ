import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Box = styled(motion.div)`
  width: 54rem;
  height: 30rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 2.5rem;
  display: flex;
  position: absolute;
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

export const StyledGuideBtn = styled.button`
  position: absolute;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #C8C8C8;
  border-radius: 50%;
  margin-top: 35%;
  margin-right: 80%;

  &:hover {
    background-color: #FAE100;
  }
`;

export const StyledGuideText = styled.div`
  position: absolute;
  font-size: 30px; /* 글씨 크기 조정 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
  color: white; /* 텍스트 색상 */
  padding: 10px; /* 패딩 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  top: 50%; /* 상단에서 50% 떨어트리기 */
  left: 50%; /* 왼쪽에서 50% 떨어트리기 */
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  line-height: 1.5;
`;
