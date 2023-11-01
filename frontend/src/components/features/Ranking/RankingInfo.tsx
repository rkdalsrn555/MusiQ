import React from 'react';
import { BackBtn } from '../../utils/BackBtn/BackBtn';
import {
  RankingWrapper,
  CenteredContainer,
  RankingItemsWrapper,
  RankingLogoImg,
} from './Ranking.styled';
import rankingLogo from '../../../assets/svgs/rankingIcon.svg';

export const RankingInfo = () => (
  <CenteredContainer>
    <BackBtn url="/select-mode" />
    <RankingLogoImg src={rankingLogo} alt="Ranking Logo" width={500} />
    <RankingWrapper>
      <RankingItemsWrapper>item</RankingItemsWrapper>
    </RankingWrapper>
  </CenteredContainer>
);
