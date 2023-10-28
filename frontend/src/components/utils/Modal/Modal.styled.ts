import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GreyBackground = styled.div`
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const ModalContainer = styled(motion.div)`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 618px;
  min-height: 252px;
  border-radius: 12px;
  text-align: center;
  padding: 24px 32px;
  background-color: #fff;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .imojiContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #dfdfe6;
    margin-bottom: 16px;

    & p {
      font-size: 2rem;
      padding: 0;
      margin: 0;
    }
  }

  & .contentText {
    font-size: 24px;
    margin: 0;
  }
`;

export const ModalBtn = styled.button<{ result: string }>`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 232px;
  height: 56px;
  border: none;
  border-radius: 100px;
  font-size: 20px;
  background-color: ${(props) =>
    props.result === 'true' ? '#3772FF' : '#F1F1F1'};
  color: ${(props) => (props.result === 'true' ? '#fff' : '#23262F')};
`;
