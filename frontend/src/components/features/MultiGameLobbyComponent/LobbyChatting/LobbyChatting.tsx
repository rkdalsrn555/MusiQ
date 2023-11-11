import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
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
}

type OwnProps = {
  socketClient: React.MutableRefObject<any>;
  lobbyChatList: { nickname: string; message: string }[];
};

export const LobbyChatting = (props: OwnProps) => {
  const { socketClient, lobbyChatList } = props;
  const location = useLocation();
  const channelNo = location.pathname.split('/').slice(-2)[0];
  const myNickname = window.localStorage.getItem('nickname') || 'Unknown';
  const [lobbyInputMessage, setLobbyInputMessage] = useState<string>('');
  const accessToken = window.localStorage.getItem('userAccessToken');

  const sendMessage = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${channelNo}`,
      headers,
      body: JSON.stringify({
        message: lobbyInputMessage,
        nickname: myNickname,
      }),
    });
  };

  // const sendMessage = () => {
  //   if (websocketClient && lobbyInputMessage.trim() !== '') {
  //     const message = {
  //       nickname: myNickname,
  //       message: lobbyInputMessage,
  //     };

  //     const headers: { [key: string]: string } = {};
  //     if (accessToken) {
  //       headers.accessToken = accessToken;
  //     }

  //     websocketClient.publish({
  //       destination: `/chat-message/${channelNo}`,
  //       headers,
  //       body: JSON.stringify(message),
  //     });
  //     setLobbyInputMessage(''); // 메시지를 보낸 후 입력 필드 비우기
  //   }
  // };

  return (
    <ChattingWrapper>
      <ChattingContentsWrapper>
        <ChattingContent>
          {lobbyChatList.map((msg) => (
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
          value={lobbyInputMessage} // 입력 필드 값 상태와 바인딩
          onChange={(e) => setLobbyInputMessage(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(); // 엔터를 누를 때 메시지 보내기
            }
          }}
        />
        <button type="button" onClick={sendMessage}>
          <img src={messageSubmit} alt="메세지 보내기" width={22} />
        </button>
      </ChattingInputWrapper>
    </ChattingWrapper>
  );
};
