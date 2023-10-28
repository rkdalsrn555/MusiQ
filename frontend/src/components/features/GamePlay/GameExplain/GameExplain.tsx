import React from 'react';
import styled from 'styled-components';

const HoverImg = styled.div`
  position: absolute;
  bottom: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    font-size: 2rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }
`;

const ExplainBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22rem;
  opacity: 0;
  padding: 1rem 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: opacity 0.2s linear;

  & h1 {
    font-size: 1.3rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  & p {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 26rem;
  height: 20rem;
  ${HoverImg}:hover {
    background-color: #fff;

    & + ${ExplainBox} {
      opacity: 1;
    }
  }
`;

export const GameExplain = () => (
  <Container>
    <HoverImg className="hoverImg">
      <p>?</p>
    </HoverImg>
    <ExplainBox className="explainBox">
      <h1>게임 규칙 Tip</h1>
      <p>모든 정답은 한글로 제출해야 인정됩니다</p>
      <h1>키보드 조작</h1>
      <p>⬅ : 처음 버튼</p>
      <p>⬇ : 중간 버튼</p>
      <p>➡ : 끝 버튼</p>
      <p>enter : 정답창 활성화 및 정답제출</p>
      <p>spacebar : 다음문제 출제</p>
    </ExplainBox>
  </Container>
);
