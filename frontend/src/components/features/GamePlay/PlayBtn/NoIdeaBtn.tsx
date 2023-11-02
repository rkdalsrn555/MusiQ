import React from 'react';
import styled from 'styled-components';

const NoIdeaButtonStyle = styled.button`
  width: 15rem;
  height: 6rem;
  background-color: rgba(255, 101, 101, 0.9);
  border-radius: 1rem;
  border: 2px solid rgba(235, 226, 255, 0.4);
  font-size: 2rem;
  font-weight: bold;
  color: #fff;

  &:hover {
    background-color: rgba(233, 78, 78, 0.9);
  }
`;

type OwnProps = {
  clickHandler: () => void;
};

export const NoIdeaBtn = (props: OwnProps) => {
  const { clickHandler } = props;

  return (
    <NoIdeaButtonStyle onClick={clickHandler}>모르겠어요</NoIdeaButtonStyle>
  );
};
