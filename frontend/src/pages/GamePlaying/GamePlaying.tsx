import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { TempLocationStateGameInfo } from '../../atoms/atoms';
import talkBoxImg from '../../assets/img/playgame/horseBaloon.png';
import {
  OptionBox,
  DancingChick,
  AnswerInput,
  HeartGauge,
  ChanceGauge,
  PlayBtn,
  NoIdeaBtn,
  NextBtn,
  ResultBtn,
  GameExplain,
} from '../../components/features';
import { BackBtn, Modal } from '../../components/utils';
import * as S from './GamePlaying.styled';

type GameOptionDataType = {
  difficulty: {
    title: string;
    select: boolean;
    time: number;
  };
  yearList: string[];
  gameRoomData: {
    roomId: number;
    streak: number;
    problems: number;
  };
};

type musicDataType = {
  musicId: number;
  musicUrl: string;
};

type answerDataType = {
  title: string;
  singer: string;
};

const FirstMusicStartTime = 0;
const SecondMusicStartTime = 60;
const ThirdMusicStartTime = 120;

export const GamePlaying = () => {
  const [locationState, setLocationState] = useRecoilState(
    TempLocationStateGameInfo
  );
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle

  const navigate = useNavigate();
  const location = useLocation();
  const [musicData, setMusicData] = useState<musicDataType>({
    musicId: 2,
    musicUrl: 'https://www.youtube.com/watch?v=JeceYRagnQE',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [gameOptionData, setGameOptionData] = useState<GameOptionDataType>();
  const [streak, setStreak] = useState<number>(0);
  const streakRef = useRef(0);
  const [answerData, setAnswerData] = useState<answerDataType>({
    title: '',
    singer: '',
  });
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3); // 생명
  const [chanceCnt, setChanceCnt] = useState<number>(3); // 기회
  const chanceCntRef = useRef(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 게임중인지, 아닌지
  const isPlayingRef = useRef(false);
  const [isJudge, setIsJudge] = useState<boolean>(false); // 채점중인지 아닌지
  const [musicReady, setMusicReady] = useState<boolean>(true); // 노래가 준비되었는지, 아닌지
  const [isLose, setIsLose] = useState<boolean>(false); // 졌는지, 안졌는지(결과창으로 라우팅 시 필요)
  const isLoseRef = useRef(false);
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isWin, setIsWin] = useState<boolean>(false);
  const isWinRef = useRef(false);
  const videoRef = useRef<ReactPlayer>(null);
  const [btn1isDisabled, setIsBtn1Disabled] = useState<boolean>(false);
  const [btn2isDisabled, setIsBtn2Disabled] = useState<boolean>(false);
  const [btn3isDisabled, setIsBtn3Disabled] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(''); // 정답 담을 state

  // 게임 플레이 실행
  const playMusic = (musicStartTime: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(musicStartTime);
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  // 몇 초 뒤에 멈출 지 설정
  const stopAfterSecond = (second: number) => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      }, second);
    }
  };

  // 버튼 리스트
  const playBtnList = [
    {
      btnName: '처음',
      // 버튼 클릭하면 노래 시작하고, 기회 감소, 버튼 못누르게 disabled 처리
      onClickHandler: (e: any) => {
        playMusic(FirstMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      },
      isBtnDisabled: btn1isDisabled,
    },
    {
      btnName: '중간',
      onClickHandler: (e: any) => {
        playMusic(SecondMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      },
      isBtnDisabled: btn2isDisabled,
    },
    {
      btnName: '끝',
      onClickHandler: (e: any) => {
        playMusic(ThirdMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      },
      isBtnDisabled: btn3isDisabled,
    },
  ];

  // 결과창으로 라우팅
  const goResultPage = () => {
    const resultData = {
      mode: location.state.checkDifficulty.title,
      selectYear: location.state.yearCheckedList,
      correctAnswerCnt: streak,
    };
    navigate('/guest/game-result', { state: resultData });
  };

  const dontKnowBtnHandler = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/result?room-id=${location.state.gameRoomData.roomId}&streak=${streak}&answer=${inputText}`
      )
      .then(async (res) => {
        setStreak(res.data.data.streak);
        streakRef.current = res.data.data.streak;
        setAnswerData({
          title: res.data.data.title,
          singer: res.data.data.singer,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 모르겠어요 클릭 시 졌다고 알려주기
  const skipNextMusic = async () => {
    await dontKnowBtnHandler();
    setIsLose(true);
    isLoseRef.current = true;
  };

  // 노래 불러오기
  const getMusic = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/quiz?room-id=${location.state.gameRoomData.roomId}&streak=${streakRef.current}`
      )
      .then((res) => {
        setMusicData({
          musicId: res.data.data.musicId,
          musicUrl: res.data.data.musicUrl,
        });
        setMusicReady(true);
        setIsBtn1Disabled(false);
        setIsBtn2Disabled(false);
        setIsBtn3Disabled(false);
        setChanceCnt(3);
        chanceCntRef.current = 3;
        setLives(3);
        setIsWin(false);
        isWinRef.current = false;
        setIsStart(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activeButtonForJudge = async () => {
    setIsJudge(true);
    setIsStart(false);

    // 채점
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/music/guest/result?room-id=${location.state.gameRoomData.roomId}&streak=${streak}&answer=${inputText}`
      )
      .then(async (res) => {
        if (res.data.data.isCorrect) {
          setIsWin(true);
          isWinRef.current = true;
          setScore((prev) => prev + 1);
          setIsJudge(false);
          setStreak(res.data.data.streak);
          streakRef.current = res.data.data.streak;
          setAnswerData({
            title: res.data.data.title,
            singer: res.data.data.singer,
          });
        } else if (lives === 0) {
          setIsLose(true);
          isLoseRef.current = true;
          setIsJudge(false);
          setStreak(res.data.data.streak);
          streakRef.current = res.data.data.streak;
          setAnswerData({
            title: res.data.data.title,
            singer: res.data.data.singer,
          });
        } else {
          setLives((prev) => prev - 1);
          setIsJudge(false);
          setStreak(res.data.data.streak);
          streakRef.current = res.data.data.streak;
        }
      })
      .catch((err) => console.log(err));
  };

  // Enter 할 시 정답 채점
  // inputText가 ''이면 정답 요청 안보냄
  // inputText가 '정답'이면 요청 보내기
  const activeEnter = (e: any) => {
    if (e.key !== 'Enter' || inputText === '') {
      return;
    }
    if (e.key === 'Enter') {
      activeButtonForJudge();
      setInputText('');
    }
  };

  useEffect(() => {
    if (!location.state || locationState.difficulty.title === '') {
      navigate('/');
    } else {
      setGameOptionData({
        difficulty: location.state?.checkDifficulty,
        yearList: location.state?.yearCheckedList,
        gameRoomData: location.state?.gameRoomData,
      });
      setStreak(location.state?.gameRoomData.streak);
      streakRef.current = location.state?.gameRoomData.streak;
      setLoading(false);

      getMusic();
    }

    const handleKeyUp = (e: any) => {
      if (
        chanceCntRef.current <= 0 ||
        e.target.nodeName === 'INPUT' ||
        isLoseRef.current ||
        isPlayingRef.current
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        playMusic(FirstMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      }
      if (e.key === 'ArrowDown') {
        playMusic(SecondMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      }
      if (e.key === 'ArrowRight') {
        playMusic(ThirdMusicStartTime);
        setChanceCnt((prev) => prev - 1);
        chanceCntRef.current -= 1;
      }
      if (e.keyCode === 32) {
        getMusic();
      }
    };

    const preventRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('beforeunload', preventRefresh);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  // 정답, 오답 띄워주기
  // 맞았으면 다음문제로 가기!
  // 틀렸으면 하트깎기
  /* eslint-disable react/jsx-props-no-spreading */
  return !location.state ? (
    <div />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <S.Container>
        <Modal
          {...modalData}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
        <BackBtn
          url="/guest/game-option"
          handleClick={() => {
            setIsToggled(true);
            setModalData({
              data: {
                title: '😥',
                message: '노래 맞추기 게임을 그만 하시겠어요?',
              },
              yesBtnClick: () => {
                setIsToggled(false);
                navigate('/guest/game-option');
              },
              noBtnClick: () => {
                setIsToggled(false);
              },
            });
          }}
        />
        <GameExplain />
        {loading ? (
          <p>게임 준비중...</p>
        ) : (
          <>
            {(isWin && !isStart) || isLose ? (
              ''
            ) : (
              <ReactPlayer
                url={musicData.musicUrl}
                controls
                playing={isPlaying}
                onPlay={() => {
                  stopAfterSecond(
                    gameOptionData ? gameOptionData.difficulty.time : 1000
                  );
                }}
                width="0"
                height="0"
                ref={videoRef}
              />
            )}

            <S.TalkBoxPosition>
              {isStart ? (
                ''
              ) : (
                <div>
                  {isJudge ? (
                    <S.TalkBoxContainer>
                      <img src={talkBoxImg} alt="말풍선" width={200} />
                      <p className="judgeText">채점중</p>
                    </S.TalkBoxContainer>
                  ) : (
                    <S.TalkBoxContainer>
                      <img src={talkBoxImg} alt="말풍선" width={200} />
                      <p className="judgeText">{isWin ? '정답!' : '오답 X!'}</p>
                    </S.TalkBoxContainer>
                  )}
                </div>
              )}
            </S.TalkBoxPosition>
            <div className="emptyBox" />
            <S.MiddleContainer>
              <S.GameStatusExplainContainer>
                {location.state.gameRoomData.problems === streak ? (
                  <p className="explainGame">
                    축하드립니다 선택한 년도의 모든 문제를 맞추셨습니다!
                  </p>
                ) : (
                  <p className="explainGame">
                    처음부터{' '}
                    <span>
                      {gameOptionData
                        ? gameOptionData.difficulty.time / 1000
                        : ''}
                      초간
                    </span>{' '}
                    들려드립니다
                  </p>
                )}
              </S.GameStatusExplainContainer>
              {location.state.gameRoomData.problems === streak ? (
                ''
              ) : (
                <S.GameStatusExplainContainer>
                  {isPlaying ? (
                    <p className="gameStatus">...Playing</p>
                  ) : (
                    <div>
                      {musicReady ? (
                        <p className="gameStatus">...wait</p>
                      ) : (
                        <p className="gameStatus">...노래를 불러오는 중</p>
                      )}
                    </div>
                  )}
                </S.GameStatusExplainContainer>
              )}

              {(isWin && !isStart) || isLose ? (
                <S.AnswerYouTubePlayerPosition>
                  <p>
                    {answerData.singer} - {answerData.title}
                  </p>
                  <ReactPlayer
                    url={musicData.musicUrl}
                    controls
                    playing
                    width="300px"
                    height="340px"
                    ref={videoRef}
                  />
                </S.AnswerYouTubePlayerPosition>
              ) : (
                <>
                  <DancingChick />
                  <AnswerInput
                    isWin={isWin}
                    isLose={isLose}
                    isJudge={isJudge}
                    inputText={inputText}
                    setInputText={(e: any) => {
                      setInputText(e);
                    }}
                    activeButton={activeButtonForJudge}
                    activeEnter={(e: any) => {
                      activeEnter(e);
                    }}
                  />
                </>
              )}

              <S.PlayingBtnBoxPosition>
                {isLose || location.state.gameRoomData.problems === streak ? (
                  <ResultBtn clickHandler={goResultPage} />
                ) : (
                  <div>
                    {isWin && !isStart ? (
                      <NextBtn clickHandler={getMusic} />
                    ) : (
                      <div>
                        {chanceCnt <= 0 ? (
                          <NoIdeaBtn clickHandler={skipNextMusic} />
                        ) : (
                          <div>
                            {isStart || musicReady ? (
                              <div className="btnContainer">
                                {playBtnList.map((item) => (
                                  <PlayBtn
                                    btnName={item.btnName}
                                    onClickHandler={item.onClickHandler}
                                    isBtnDisabled={isPlaying}
                                    key={item.btnName}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="loadingMusic">
                                ...노래를 불러오는 중
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </S.PlayingBtnBoxPosition>
            </S.MiddleContainer>
            <S.RightSideContainer>
              <S.TopRightSideContainer>
                <OptionBox
                  difficulty={
                    gameOptionData ? gameOptionData.difficulty.title : ''
                  }
                />
                <HeartGauge lives={lives} />
              </S.TopRightSideContainer>
              <S.bottomRightSideContainer>
                <ChanceGauge chanceCnt={chanceCnt} />
              </S.bottomRightSideContainer>
            </S.RightSideContainer>
          </>
        )}
      </S.Container>
    </motion.div>
  );
};
