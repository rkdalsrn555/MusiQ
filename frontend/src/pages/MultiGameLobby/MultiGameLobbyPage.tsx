import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// eslint-disable-next-line import/no-unresolved
import { Client, Stomp } from '@stomp/stompjs';
import { motion } from 'framer-motion';
import { websocketClientState } from '../../atoms/atoms';
import { userApis } from '../../hooks/api/userApis';
import {
  LobbyCreateRoomButton,
  LobbyChatting,
  LobbyRooms,
  LobbyUsersList,
  RefreshButton,
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import {
  LobbyWrapper,
  MulitBackGround,
  ButtonsWrapper,
} from './MultiGameLobby.styled';

type OwnProps = {
  socketClient: React.MutableRefObject<any>;
  lobbyChatList: { nickname: string; message: string }[];
  topicNumber: React.MutableRefObject<number>;
  setIsRoomExisted: Dispatch<SetStateAction<boolean>>;
};

export const MultiGameLobbyPage = (props: OwnProps) => {
  const { socketClient, lobbyChatList, topicNumber, setIsRoomExisted } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const websocketClient = useRecoilValue(websocketClientState);
  const channelNumber = location.pathname.split('/').slice(-2)[0];
  const accessToken = window.localStorage.getItem('userAccessToken');

  useEffect(() => {
    // 모바일 기기 접근을 막는 로직
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
          <ButtonsWrapper>
            <LobbyCreateRoomButton
              topicNumber={topicNumber}
              setIsRoomExisted={setIsRoomExisted}
            />
          </ButtonsWrapper>
          <LobbyChatting
            socketClient={socketClient}
            lobbyChatList={lobbyChatList}
          />
        </LobbyWrapper>
      </MulitBackGround>
    </motion.div>
  );
};
