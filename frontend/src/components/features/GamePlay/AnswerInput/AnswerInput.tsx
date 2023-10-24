import React, { useState, useEffect, useRef } from 'react';
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
`;

export const AnswerInput = () => {
  const [inputText, setInputText] = useState<string>('');
  const focusRef = useRef<HTMLInputElement>(null);

  const activeButton = () => {
    alert(`${inputText} 입력 완료`);
  };

  const activeEnter = (e: any) => {
    if (inputText === '') {
      return;
    }
    if (e.key === 'Enter') {
      activeButton();
      setInputText('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputText === '') {
        if (focusRef.current) {
          focusRef.current.focus();
        }
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
          onChange={(e) => setInputText(e.target.value)}
          onKeyUp={(e) => activeEnter(e)}
          ref={focusRef}
        />
      </InputStyle>
      <p>enter 키로 활성화, enter키로 정답 제출</p>
    </Container>
  );
};
