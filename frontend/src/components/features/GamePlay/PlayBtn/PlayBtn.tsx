import React from 'react';
import styled from 'styled-components';

const PlayButtonStyle = styled.button`
  width: 8rem;
  height: 8rem;
  background-color: #6adf60;
  border-radius: 1rem;
  border: 2px solid rgba(235, 226, 255, 0.4);
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
`;

type OwnProps = {
  btnName: string;
  onClickHandler: () => void;
};

export const PlayBtn = (props: OwnProps) => {
  const { btnName, onClickHandler } = props;

  return (
    <PlayButtonStyle type="button" onClick={onClickHandler}>
      {btnName}
    </PlayButtonStyle>
  );
};
