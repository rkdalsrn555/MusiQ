import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { MultiGamePlaying, MultiGameLobbyPage } from '..';

export const SocketPage = () => {
  const [isMakeRoom, setIsMakeRoom] = useState<boolean>(false);
  const client = useRef<any>({});

  // 구독
  const subscribe = () => {
    client.current.subscribe('/topic/{채널넘버}');
    client.current.subscribe('/chat-message/{로비 채널넘버}');
    client.current.subscribe('/chat-message/{게임방 채널넘버}');
  };

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/api',
      onConnect: subscribe,
    });
    client.current.activate();
  };

  // 소켓 연결 해제
  const disconnect = () => {
    client.current.deactivate();
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div>
      {isMakeRoom ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <MultiGamePlaying />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <MultiGameLobbyPage />
        </motion.div>
      )}
    </div>
  );
};
