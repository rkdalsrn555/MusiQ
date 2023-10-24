import React from 'react';
import styled from 'styled-components';
import answerInput from '../../../../assets/img/playgame/answerInput.png';

const Container = styled.div`
  position: relative;

  & p {
    position: absolute;
    bottom: -1.5rem;
    left: 0.9rem;
    font-weight: bold;
  }
`;

const InputStyle = styled.input`
  background-image: url(${answerInput});
  width: 21.1rem;
  height: 6.4rem;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 1rem;
  font-size: 2rem;
`;

export const AnswerInput = () => (
  <Container>
    <InputStyle />
    <p>enter 키로 활성화, enter키로 정답 제출</p>
  </Container>
);
