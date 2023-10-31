import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackBtnIcon } from '../../../assets/svgs/backBtn.svg';

const PositionStyle = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;

  & svg:hover {
    fill: #414141;
    transition: 0.7s;
  }
`;

// eslint-disable-next-line react/require-default-props
export const BackBtn = (props: { url: string; handleClick?: () => void }) => {
  const navigate = useNavigate();
  const {
    url,
    handleClick = () => {
      navigate(url);
    },
  } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClick]);

  return (
    <PositionStyle>
      <BackBtnIcon
        width={150}
        height={100}
        onClick={handleClick}
        fill="rgba(164, 164, 164, 0.8)"
      />
    </PositionStyle>
  );
};
