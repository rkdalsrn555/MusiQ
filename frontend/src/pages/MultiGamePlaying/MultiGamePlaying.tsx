import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import * as StompJs from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import bubbleBg from '../../assets/img/playgame/horseBaloon.png';
import {
  MultiGameStatus,
  MultiGameChatting,
  MultiGameHint,
  MultiGameProgress,
  MultiGameSkip,
  MultiDancingChick,
} from '../../components/features';
import * as S from './MultiGamePlaying.styled';

type GameUserList = {
  nickname: string;
  score: number;
};

type GameChatType = {
  nickname: string;
  message: string;
};

type AnswerDataType = {
  title: string;
  singer: string;
};

const mockUserData1 = [
  { score: 12, nickname: '장충동왕족발보쌈' },
  { score: 6, nickname: '이르케' },
];

export const MultiGamePlaying = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = window.localStorage.getItem('userAccessToken') ?? '';
  const client = useRef<any>({}); // 게임 소켓 클라이언트
  const gameRoomNumber = Number(location.pathname.split('/')[4]); // 게임방번호
  const [gameChatList, setGameChatList] = useState<GameChatType[]>([]); // 채팅리스트
  const [gameUserList, setGameUserList] = useState<GameUserList[]>([]); // 유저리스트

  const [manager, setManager] = useState<string>(''); // 내가 게임방의 매니저인지 아닌지
  const [playTime, setPlayTime] = useState<number>(0); // 플레이타임
  const [isGameStart, setIsGameStart] = useState<boolean>(true); // 게임 시작되었는지 아닌지

  const [initialHint, setInitialHint] = useState<string>(''); // 초성힌트
  const [singerHint, setSingerHint] = useState<string>(''); // 가수힌트
  const [winner, setWinner] = useState<string>(''); // 우승자가 없을때는 '', 있을때는 string
  const [answerData, setAnswerData] = useState<AnswerDataType>({
    title: '',
    singer: '',
  }); // 정답 제목, 가수

  // 모바일 기기 접근을 막는 로직
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      navigate('/mobile-restriction');
    }
  }, []);

  // 구독
  const subscribe = () => {
    client.current.subscribe(`/topic/${gameRoomNumber}`, (message: any) => {
      const msg = JSON.parse(message.body);

      switch (msg.messageType) {
        case 'ENTERUSER': // 유저 입장 시 마다 pub
          setGameUserList(msg.userInfoItems);
          setManager(msg.gameRoomManagerNickname);
          setGameChatList((prev) => [
            ...prev,
            {
              nickname: '삐약이',
              message: `${msg.enteredUserNickname}님이 입장하셨습니다.`,
            },
          ]);
          break;
        case 'EXITUSER': // 유저 나갈 때 pub
          setGameUserList(mockUserData1);
          setManager(msg.gameRoomManagerNickname);
          setGameChatList((prev) => [
            ...prev,
            {
              nickname: '삐약이',
              message: `${msg.enteredUserNickname}님이 퇴장하셨습니다.`,
            },
            {
              nickname: '삐약이',
              message: `방장이 ${msg.manager}님으로 변경되었습니다. 방장이 게임을 시작해주세요.`,
            },
          ]);
          break;
        case 'CHAT': // 유저가 채팅 보냈을 때
          setGameChatList((prev) => [
            ...prev,
            { nickname: msg.nickname, message: msg.message },
          ]);
          break;
        case 'GAMESTART': // 게임 시작 버튼 클릭시
          break;
        case 'TIME': // 시간초세기
          break;
        case 'MUSICPROBLEM': // 음악 문제 세팅
          break;
        case 'SINGERHINT': // 가수힌트
          setSingerHint(msg.singerHint);
          break;
        case 'INITIALHINT': // 초성힌트
          setInitialHint(msg.initialHint);
          break;
        case 'GAMERESULT': // 게임 끝났을 때 유저리스트 반환
          break;
        case 'BEFORESKIP': // 누군가 문제 맞추기 전 스킵요청
          break;
        case 'AFTERSKIP': // 문제 맞춘 후 스킵요청
          break;
        case 'BEFOREANSWERCORRECT': // 정답 맞췄을때 누가 정답맞췄고, 정답이 뭔지
          setAnswerData({ title: msg.title, singer: msg.singer });
          setSingerHint(msg.singerHint);
          setInitialHint(msg.initialHint);
          setWinner(msg.winner);
          break;
        case 'MUSICPLAY': // 노래 시작 타이밍
          break;
        case 'GOWAITING': // 게임 끝났을 때 대기상태로 다시 변환
          break;
        default:
          break;
      }
    });
  };

  const enterRoom = () => {
    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.accessToken = accessToken;
    }
    client.current.publish({
      destination: `/chat-message/${location.pathname.split('/')[4]}`,
      headers,
      body: JSON.stringify({
        messageType: 'ENTERUSER',
        nickname: window.localStorage.getItem('nickname'),
      }),
    });
  };

  // 소켓 연결
  const connect = async () => {
    client.current = await new StompJs.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}`,
      connectHeaders: {
        accessToken,
        channelNo: String(gameRoomNumber),
        connectType: 'ENTER_GAME_ROOM',
        password: location.state.requestBody.password,
      },
      onConnect: subscribe,
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers.message);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 첫 렌더링 시 소켓연결, 페이지 떠날 시 disconnect
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Container>
        <MultiGameStatus gameUserList={gameUserList} manager={manager} />
        <S.topPosition>
          <S.ExplainBox>
            {isGameStart ? (
              <MultiGameHint
                singerHint={singerHint}
                initialHint={initialHint}
              />
            ) : (
              <p className="waiting">...게임 대기중입니다</p>
            )}
          </S.ExplainBox>
          <MultiDancingChick />
        </S.topPosition>
        <S.middlePosition>
          <MultiGameSkip gameStatus={isGameStart} />
        </S.middlePosition>
        <S.bottomPosition>
          <MultiGameChatting
            gameChatList={gameChatList}
            setGameChatList={setGameChatList}
            socketClient={client}
          />
        </S.bottomPosition>
      </S.Container>
    </motion.div>
  );
};
