import React from 'react';
import styled from 'styled-components';
import skipBtn from '../../../../assets/img/playgame/skipBtn.png';
import clickSkipBtn from '../../../../assets/img/playgame/clickSkipBtn.png';

const NoIdeaButtonStyle = styled.button`
  width: 6rem;
  height: 6rem;
  background-image: url(${skipBtn});
  background-size: contain;

  &:active {
    background-image: url(${clickSkipBtn});
    background-size: contain;
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const SkipBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return <NoIdeaButtonStyle onClick={clickHandler} />;
};
