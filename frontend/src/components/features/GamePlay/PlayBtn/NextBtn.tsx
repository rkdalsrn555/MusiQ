import React, { MutableRefObject, useEffect } from 'react';
import styled from 'styled-components';
import nextBtn from '../../../../assets/img/playgame/nextBtn.png';
import clickNextBtn from '../../../../assets/img/playgame/clickNextBtn.png';

const NextButtonStyle = styled.button<{ keyEventRef: string }>`
  width: 12rem;
  height: 6rem;
  background-image: ${(props) =>
    props.keyEventRef === 'SpaceBar'
      ? `url(${clickNextBtn})`
      : `url(${nextBtn})`};
  background-size: contain;

  &:active {
    background-image: url(${clickNextBtn});
    background-size: contain;
  }
`;

type OwnProps = {
  clickHandler: () => void;
  keyEventRef: MutableRefObject<string>;
};

export const NextBtn = (props: OwnProps) => {
  const { clickHandler, keyEventRef } = props;
  return (
    <NextButtonStyle onClick={clickHandler} keyEventRef={keyEventRef.current} />
  );
};
