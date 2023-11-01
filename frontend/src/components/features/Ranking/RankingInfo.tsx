import React from 'react';
import { BackBtn } from '../../utils/BackBtn/BackBtn';
import {
  RankingWrapper,
  CenteredContainer,
  RankingItemsWrapper,
  RankingLogoImg,
  RankingHeader,
  RankingItem,
  Cell,
  HeaderCell,
  RankingContainer,
} from './Ranking.styled';
import rankingLogo from '../../../assets/svgs/rankingIcon.svg';

const rankingData = Array.from({ length: 100 }, (_, index) => ({
  rank: index + 1,
  nickname: `User${index + 1}`,
  exp: Math.floor(Math.random() * 1000),
}));

export const RankingInfo = () => (
  <CenteredContainer>
    <BackBtn url="/select-mode" />
    <RankingLogoImg src={rankingLogo} alt="Ranking Logo" width={500} />
    <RankingWrapper>
      <RankingContainer>
        <RankingHeader>
          <HeaderCell>순위</HeaderCell>
          <HeaderCell>닉네임</HeaderCell>
          <HeaderCell>경험치</HeaderCell>
        </RankingHeader>
        <RankingItemsWrapper>
          {rankingData.map(item => (
            <RankingItem key={item.rank}>
              <Cell>{item.rank}</Cell>
              <Cell>{item.nickname}</Cell> 
              <Cell>{item.exp}</Cell> 
            </RankingItem>
          ))}
        </RankingItemsWrapper>
      </RankingContainer>
    </RankingWrapper>
  </CenteredContainer>
);
