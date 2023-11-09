import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Client, IMessage } from '@stomp/stompjs';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { websocketClientState } from '../../../../atoms/atoms';
import {
  ChattingWrapper,
  ChattingContentsWrapper,
  ChattingInputWrapper,
  StyledInput,
  ChattingContent,
} from './LobbyChatting.styled';
import messageSubmit from '../../../../assets/svgs/MultiLobby/chatSubmit.svg';

interface ChatMessage {
  nickname: string;
  message: string;
  time: Date;
}

export const LobbyChatting: React.FC = () => {
  const websocketClient = useRecoilValue(websocketClientState);
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const location = useLocation();
  const channelNo = location.pathname.split('/').slice(-2)[0];
  const myNickname = window.localStorage.getItem('nickname') || 'Unknown';
  const [inputMessage, setInputMessage] = useState<string>('');

  const sendMessage = () => {
    if (websocketClient && inputMessage.trim() !== '') {
      console.log(myNickname);
      console.log(websocketClient);
      const message = {
        nickname: myNickname,
        message: inputMessage,
        time: new Date(),
      };

      websocketClient.publish({
        destination: `/chat-message/${channelNo}`,
        body: JSON.stringify(message),
      });

      setInputMessage(''); // 메시지를 보낸 후 입력 필드를 비웁니다.
    }
  };

  return (
    <ChattingWrapper>
      <ChattingContentsWrapper>
        <ChattingContent>
          {messages.map((msg) => (
            <div key={msg.nickname}>
              <strong>{msg.nickname}:</strong> {msg.message}
            </div>
          ))}
        </ChattingContent>
      </ChattingContentsWrapper>
      <ChattingInputWrapper>
        <StyledInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={inputMessage} // 입력 필드 값 상태와 바인딩
          onChange={(e) => setInputMessage(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(); // 엔터를 누를 때 메시지 보내기
            }
          }}
        />
        <button type="button" onClick={sendMessage}>
          <img src={messageSubmit} alt="메세지 보내기" width={25} />
        </button>
      </ChattingInputWrapper>
    </ChattingWrapper>
  );
};
