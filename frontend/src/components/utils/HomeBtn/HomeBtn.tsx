import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeBtnIcon} from '../../../assets/svgs/HomeButton.svg';

const HomePosition = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`;

export const HomeBtn = (props: { url: string }) => {
  const { url } = props;
  const navigate = useNavigate();

  return (
    <HomePosition>
      <HomeBtnIcon
        width={150}
        height={100}
        onClick={() => {
          navigate(url);
        }} />
    </HomePosition>
  )

}