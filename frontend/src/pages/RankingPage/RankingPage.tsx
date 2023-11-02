import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledRankingImg, StyledRankingDiv } from './RankingPage.styled';
import { RankingInfo } from '../../components/features/Ranking/RankingInfo';

export const RankingPage = () => {
  const navigate = useNavigate();

  useEffect(() => { // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  return (
    <RankingInfo />
  )
}
