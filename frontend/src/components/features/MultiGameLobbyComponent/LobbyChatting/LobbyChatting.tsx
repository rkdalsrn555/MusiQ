import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Client, IMessage } from '@stomp/stompjs';
import styled from 'styled-components';
import {
  ChattingWrapper,
  ChattingContentsWrapper,
  ChattingInputWrapper,
  StyledInput,
} from './LobbyChatting.styled';

interface ChatMessage {
  content: string;
  sender: string;
  time: Date;
}

export const LobbyChatting: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/api/game-websocket',
      onConnect: () => {
        setConnected(true);
        stompClient.subscribe('/topic/messages', (message: IMessage) => {
          const newMessage: ChatMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error(frame.headers.message);
        setConnected(false);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      client?.deactivate();
    };
  }, []);

  const sendMessage = (msgContent: string) => {
    if (client && connected) {
      const message: ChatMessage = {
        content: msgContent,
        sender: 'Your Name',
        time: new Date(),
      };

      client.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <ChattingWrapper>
      <ChattingContentsWrapper>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{msg.content}</div>
        ))}
      </ChattingContentsWrapper>
      <ChattingInputWrapper>
        <StyledInput type="text" placeholder="메시지를 입력하세요..." />
        <button type="button" onClick={() => sendMessage('안녕하세요!')}>
          보내기
        </button>
      </ChattingInputWrapper>
    </ChattingWrapper>
  );
};
