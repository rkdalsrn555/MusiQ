import React from 'react';
import styled from 'styled-components';

const NextButtonStyle = styled.button`
  width: 15rem;
  height: 6rem;
  background-color: rgba(68, 131, 254, 0.9);
  border-radius: 1rem;
  border: 2px solid rgba(235, 226, 255, 0.4);
  font-size: 2rem;
  font-weight: bold;
  color: #fff;

  &:hover {
    background-color: rgba(45, 115, 255, 0.9);
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const NextBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return <NextButtonStyle onClick={clickHandler}>다음 문제</NextButtonStyle>;
};
