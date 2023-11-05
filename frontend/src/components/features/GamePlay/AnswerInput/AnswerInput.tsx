import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import answerInput from '../../../../assets/img/playgame/answerInput.png';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

const Container = styled.div`
  position: relative;
  margin-bottom: 2rem;

  & .explainKey {
    position: absolute;
    bottom: -1.5rem;
    left: 0.9rem;
    font-weight: bold;
  }
`;

const InputStyle = styled.div`
  & input {
    background-image: url(${answerInput});
    width: 21.1rem;
    height: 6.4rem;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding: 1rem;
    font-size: 2rem;
  }

  & input:hover,
  & input:active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }
`;

type OwnProps = {
  isWin: boolean;
  isLose: boolean;
  isJudge: boolean;
  inputText: string;
  setInputText: (e: any) => void;
  activeButton: (inputText: string) => void;
};

// Enter 할 시 정답 채점
// inputText가 ''이면 정답 요청 안보냄
// inputText가 '정답'이면 요청 보내기
// const activeEnter = (e: any) => {
//   if (e.key !== 'Enter') {
//     return;
//   }
//   if (e.key === 'Enter' && inputText !== '') {
//     activeButtonForJudge();
//     setInputText('');
//   }
// };

export const AnswerInput = (props: OwnProps) => {
  const { isWin, isLose, isJudge, inputText, setInputText, activeButton } =
    props;
  const focusRef = useRef<HTMLInputElement>(null);
  const inputFocusRef = useRef<boolean>(false);
  const inputTextRef = useRef<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputTextRef.current === '') {
        if (focusRef.current) {
          if (inputFocusRef.current) {
            focusRef.current.blur();
            inputFocusRef.current = false;
          } else {
            focusRef.current.focus();
            inputFocusRef.current = true;
          }
        }
      } else if (e.key === 'Enter' && inputTextRef.current !== '') {
        activeButton(inputTextRef.current);
        setInputText('');
        inputTextRef.current = '';
        inputFocusRef.current = false;
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    };

    window.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Container>
      <InputStyle>
        <input
          type="text"
          placeholder="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            inputTextRef.current = e.target.value;
          }}
          ref={focusRef}
          disabled={isJudge || isWin || isLose}
          readOnly={isJudge || isWin || isLose}
        />
      </InputStyle>
      <p className="explainKey">enter 키로 활성화, enter키로 정답 제출</p>
    </Container>
  );
};
