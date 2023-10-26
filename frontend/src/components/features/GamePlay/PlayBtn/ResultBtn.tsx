import React from 'react';
import styled from 'styled-components';

const ResultButtonStyle = styled.button`
  width: 15rem;
  height: 6rem;
  background-color: rgba(255, 203, 21, 0.9);
  border-radius: 1rem;
  border: 2px solid rgba(235, 226, 255, 0.4);
  font-size: 2rem;
  font-weight: bold;
  color: #fff;

  &:hover {
    background-color: rgba(255, 200, 0, 0.9);
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const ResultBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return (
    <ResultButtonStyle onClick={clickHandler}>결과 보기</ResultButtonStyle>
  );
};
