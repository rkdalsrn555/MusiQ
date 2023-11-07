import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChannelComponent } from '../../components/features';
import { BackBtn } from '../../components/utils';
import { ChannelWrapper, CenteredContainer } from './MultiChannelPage.styled';
import channelIcon from '../../assets/svgs/channelSelectionLogo.svg';

export const MultiChannelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 모바일 기기 접근을 막기 위해 추가한 코드
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <CenteredContainer>
        <BackBtn url="/select-mode" />
        <ChannelWrapper>
          <img src={channelIcon} alt="채널 아이콘" width={300} />
          <ChannelComponent />
        </ChannelWrapper>
      </CenteredContainer>
    </motion.div>
  );
};
