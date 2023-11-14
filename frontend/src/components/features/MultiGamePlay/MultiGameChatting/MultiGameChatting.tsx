import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './MultiGameChatting.styled';
import { MultiSkipBox } from '../MultiSkipBox';

type ChatType = {
  nickname: string;
  message: string;
};

type OwnProps = {
  userLength: number;
  skipVote: number;
  gameChatList: ChatType[];
  socketClient: React.MutableRefObject<any>;
  setGameChatList: Dispatch<SetStateAction<ChatType[]>>;
};

export const MultiGameChatting = (props: OwnProps) => {
  const { userLength, skipVote, gameChatList, socketClient, setGameChatList } =
    props;
  const accessToken = window.localStorage.getItem('userAccessToken');
  const location = useLocation();
  const focusRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<string>('');
  const inputFocusRef = useRef<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null); // 채팅창 맨 밑으로 스크롤 내리기
  const nickname = window.localStorage.getItem('nickname');

  const sendChat = () => {
    if (String(inputTextRef.current).trim() === '') {
      return;
    }
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    socketClient.current.publish({
      destination: `/chat-message/${location.pathname.split('/')[4]}`,
      headers,
      body: JSON.stringify({
        messageType: 'CHAT',
        message: inputTextRef.current,
        nickname: window.localStorage.getItem('nickname'),
      }),
    });
    // if (inputTextRef.current === '.') {
    //   setGameChatList((prev) => [
    //     ...prev,
    //     {
    //       nickname: '삐약이',
    //       message: `${nickname}님 스킵투표되었습니다, 이 투표는 다른사람에게 공개되지 않습니다.`,
    //     },
    //   ]);
    // }
    setInputText('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameChatList]); // lobbyChatList가 변경될 때마다 스크롤 조정(맨 아래로)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputTextRef.current === '') {
        if (focusRef.current) {
          if (inputFocusRef.current) {
            focusRef.current.blur();
            inputFocusRef.current = false;
          } else {
            focusRef.current.focus();
            inputFocusRef.current = true;
          }
        }
      } else if (e.key === 'Enter' && inputTextRef.current !== '') {
        sendChat();
        inputTextRef.current = '';
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    };

    window.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <S.Container
      onClick={() => {
        inputFocusRef.current = false;
      }}
    >
      <MultiSkipBox skipVote={skipVote} userLength={userLength} />
      <S.ChatListContainer>
        {gameChatList.map((chat, index) => (
          <S.NicknameColor
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="chatMessage"
            nickname={chat.nickname}
          >
            <div className="nickname">{chat.nickname} : </div>
            <div className="message">{chat.message}</div>
          </S.NicknameColor>
        ))}
        <div ref={chatEndRef} />
      </S.ChatListContainer>
      <S.GameChatInputContainer>
        <label htmlFor="gameChatInput">
          {window.localStorage.getItem('nickname')}
        </label>
        <S.GameChatInput
          type="text"
          id="gameChatInput"
          className="gameChatInput"
          placeholder="엔터키로 활성화 후 채팅 입력"
          value={inputText}
          ref={focusRef}
          onChange={(e) => {
            setInputText(e.target.value);
            inputTextRef.current = e.target.value;
          }}
        />
      </S.GameChatInputContainer>
    </S.Container>
  );
};
