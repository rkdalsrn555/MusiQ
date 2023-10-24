import React from 'react';
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

export const BackBtn = (props: { url: string }) => {
  const { url } = props;
  const navigate = useNavigate();

  return (
    <PositionStyle>
      <BackBtnIcon
        width={150}
        height={100}
        onClick={() => {
          navigate(url);
        }}
        fill="rgba(164, 164, 164, 0.8)"
      />
    </PositionStyle>
  );
};
