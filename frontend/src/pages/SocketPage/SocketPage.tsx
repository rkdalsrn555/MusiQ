import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import { userApis } from '../../hooks/api/userApis';
import { MultiGamePlaying, MultiGameLobbyPage } from '..';

export const SocketPage = () => {
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';
  const [isRoomExisted, setIsRoomExisted] = useState<boolean>(false);
  const location = useLocation();
  const client = useRef<any>({});
  const topicNumber = useRef<number>(0);
  // 로비 채팅 리스트 상태 - 병철
  const [lobbyChatList, setLobbyChatList] = useState<
    { nickname: string; message: string }[]
  >([]);

  // 구독
  const subscribe = () => {
    client.current.subscribe(
      `/topic/${topicNumber.current}`,
      (message: any) => {
        // 채널넘버일때 - 병철
        if (topicNumber.current >= 1 || topicNumber.current <= 10) {
          const msg = JSON.parse(message.body);
          setLobbyChatList((prev) => [
            ...prev,
            { nickname: msg.nickname, message: msg.message },
          ]);
        } else {
          // 게임방 관련 상태 - 채련
          console.log('제발!!!!');
        }
      }
    );
  };

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        accessToken,
        channelNo: location.pathname.split('/')[2],
      },
      onConnect: subscribe,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers.message);
      },
    });
    client.current.activate();
  };

  // 소켓 연결 해제
  const postSocketDisconnect = async () => {
    try {
      const response = await userApis.post(
        `${process.env.REACT_APP_BASE_URL}/game/${Number(
          location.pathname.split('/')[2]
        )}`
      );
      console.log('Left channel successfully.', response.data);
    } catch (error) {
      console.error('Error leaving channel:', error);
    }
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    topicNumber.current = Number(location.pathname.split('/')[2]);
    connect();
    return () => {
      disconnect();
      postSocketDisconnect();
    };
  }, []);

  return (
    <div>
      {isRoomExisted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <MultiGamePlaying socketClient={client} topicNumber={topicNumber} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <MultiGameLobbyPage
            socketClient={client}
            lobbyChatList={lobbyChatList}
            topicNumber={topicNumber}
            setIsRoomExisted={setIsRoomExisted}
          />
        </motion.div>
      )}
    </div>
  );
};
