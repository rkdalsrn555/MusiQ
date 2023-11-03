import React from 'react';
import axios from 'axios';
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

// const fetchRankingData = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ranking`);
//     return response.data.map(([nickname, exp], index) => ({
//       rank: index + 1,
//       nickname,
//       exp
//     }));
//   } catch (error) {
//     console.error('Error fetching ranking data:', error);
//     return [];
//   }
// };

const rankingData = Array.from({ length: 100 }, (_, index) => ({
  rank: index + 1,
  nickname: `User${index + 1}`,
  exp: Math.floor(Math.random() * 1000), // 임의의 랜덤값, api 완성되면 바꿔야함
}));

export const RankingInfo = () => (
  <CenteredContainer>
    <BackBtn url="/select-mode" />
    <RankingLogoImg src={rankingLogo} alt="Ranking Logo" width={400} />
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

// const [rankingData, setRankingData] = useState([]); // 이건 RankingInfo 안에 넣을거임

//   useEffect(() => {
//     fetchRankingData().then(data => {
//       setRankingData(data);
//     });
//   }, [])