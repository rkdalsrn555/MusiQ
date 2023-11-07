import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LobbyButtons,
  LobbyChatting,
  LobbyRooms,
  LobbyUsersList,
  RefreshButton,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import { LobbyWrapper, MulitBackGround } from './MultiGameLobby.styled';

export const MultiGameLobbyPage = () => {
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
      <MulitBackGround>
        <LobbyWrapper>
          <RefreshButton />
          <BackBtn url="/multi/channel" />
          <LobbyUsersList />
          <LobbyRooms />
          <LobbyButtons />
          <LobbyChatting />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
