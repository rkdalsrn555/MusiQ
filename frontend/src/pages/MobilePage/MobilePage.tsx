import React from 'react';
import mobileNotice from '../../assets/svgs/mobileResctriction.svg';
import { StyledDiv } from './MobilePage.styled';

export const MobilePage = () => (
  <StyledDiv>
    <img src={mobileNotice} alt="mobile" />
  </StyledDiv>
);
