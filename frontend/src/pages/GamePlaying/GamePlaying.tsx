import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
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
} from '../../components/features';
import { BackBtn } from '../../components/utils';
import * as S from './GamePlaying.styled';

type musicDataType = {
  musicId: number;
  musicUrl: string;
};

const FirstMusicStartTime = 0;
const SecondMusicStartTime = 60;
const ThirdMusicStartTime = 120;

export const GamePlaying = () => {
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState<musicDataType>({
    musicId: 2,
    musicUrl: 'https://www.youtube.com/watch?v=JeceYRagnQE',
  });
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3); // 생명
  const [chanceCnt, setChanceCnt] = useState<number>(3); // 기회
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 게임중인지, 아닌지
  const [isJudge, setIsJudge] = useState<boolean>(false); // 채점중인지 아닌지
  const [musicReady, setMusicReady] = useState<boolean>(true); // 노래가 준비되었는지, 아닌지
  const [isLose, setIsLose] = useState<boolean>(false); // 졌는지, 안졌는지(결과창으로 라우팅 시 필요)
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isWin, setIsWin] = useState<boolean>(false);
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
    }
  };

  // 몇 초 뒤에 멈출 지 설정
  const stopAfterSecond = (second: number) => {
    if (isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, second);
    }
  };

  // 버튼 리스트
  const playBtnList = [
    {
      btnName: '처음',
      // 버튼 클릭하면 노래 시작하고, 기회 감소, 버튼 못누르게 disabled 처리
      onClickHandler: () => {
        playMusic(FirstMusicStartTime);
        setChanceCnt((prev) => prev - 1);
      },
      isBtnDisabled: btn1isDisabled,
    },
    {
      btnName: '중간',
      onClickHandler: () => {
        playMusic(SecondMusicStartTime);
        setChanceCnt((prev) => prev - 1);
      },
      isBtnDisabled: btn2isDisabled,
    },
    {
      btnName: '끝',
      onClickHandler: () => {
        playMusic(ThirdMusicStartTime);
        setChanceCnt((prev) => prev - 1);
      },
      isBtnDisabled: btn3isDisabled,
    },
  ];

  // 서버에서 노래 받아오기 (목데이터)
  const getNextMusic = () => {
    setMusicData({
      musicId: 1,
      musicUrl: 'https://www.youtube.com/watch?v=l-jZOXa7gQY',
    });
    setMusicReady(true);
    setIsBtn1Disabled(false);
    setIsBtn2Disabled(false);
    setIsBtn3Disabled(false);
    setChanceCnt(3);
    setIsWin(false);
    setIsStart(true);
  };

  // 결과창으로 라우팅
  const goResultPage = () => {
    const resultData = {
      mode: 'easy',
      selectYear: '70년대',
      correctAnswerCnt: score,
    };
    navigate('/guest/game-result', { state: resultData });
  };

  // 모르겠어요 클릭 시 졌다고 알려주기
  const skipNextMusic = () => {
    setIsLose(true);
  };

  // 채점
  // const getCheckAnswer = axios.get(
  //   `${
  //     process.env.REACT_APP_BASE_URL
  //   }/music/guest/quiz?difficulty=${'easy'}&year=${'70'}`
  // );

  // const activeButtonForJudge = () => {
  //   setIsJudge(true);
  //   // 요청 보내기
  //   // 정답일 시 다음 문제로!,
  //   // 오답일 시 하트 까고, 하트가 0개 미만이면 결과 페이지로 라우팅
  //   getCheckAnswer
  //     .then((res) => {
  //       if (res.data.data.isCorrect) {
  //         getNextMusic();
  //         setScore((prev)=>prev + 1);
  //       } else {
  //         if (lives === 0) {
  //           const resultData = {
  //             mode: 'easy',
  //             selectYear: '70년대',
  //             correctAnswerCnt: score,
  //           };
  //           navigate('/', { state: resultData });
  //         }else{
  //         setLives((prev) => prev - 1);}
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  const mockResData = {
    code: '200',
    message: 'success',
    data: {
      score: 1,
      isCorrect: false,
    },
  };
  const activeButtonForJudge = () => {
    setIsJudge(true);
    setIsStart(false);

    setTimeout(() => {
      if (mockResData.data.isCorrect) {
        getNextMusic();
        setIsWin(false);
        setScore((prev) => prev + 1);
      } else if (lives === 0) {
        setIsLose(true);
        setIsJudge(false);
      } else {
        setLives((prev) => prev - 1);
        setIsJudge(false);
      }
    }, 500);
  };
  // Enter 할 시 정답 채점
  // inputText가 ''이면 정답 요청 안보냄
  // inputText가 '정답'이면 요청 보내기
  const activeEnter = (e: any) => {
    if (inputText === '') {
      return;
    }
    if (e.key === 'Enter') {
      activeButtonForJudge();
      setInputText('');
    }
  };

  // 노래 불러오기
  // const getNextMusic = axios
  //   .get(`${process.env.REACT_APP_BASE_URL}/music/guest/quiz?difficulty=${difficulty}&year=${year}`)
  //   .then((res) => {
  //     setMusicData({
  //       musicId: res.data.data.musicId,
  //       musicUrl: res.data.data.musicUrl,
  //     });
  //     setMusicReady(true);
  //     setIsBtn1Disabled(false);
  //     setIsBtn2Disabled(false);
  //     setIsBtn3Disabled(false);
  //     setChanceCnt(3);
  //     setScore(res.data.data.score);
  //     setIsJudge(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // 정답, 오답 띄워주기
  // 맞았으면 다음문제로 가기!
  // 틀렸으면 하트깎기
  return (
    <S.Container>
      <BackBtn url="/guest/game-option" />
      <ReactPlayer
        url={musicData.musicUrl}
        controls
        playing={isPlaying}
        onPlay={() => {
          stopAfterSecond(1000);
        }}
        width="0"
        height="0"
        ref={videoRef}
      />
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
          <p className="explainGame">
            처음부터 <span>{1}초간</span> 들려드립니다
          </p>
        </S.GameStatusExplainContainer>
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
        <DancingChick />
        <AnswerInput
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
        <S.PlayingBtnBoxPosition>
          {isLose ? (
            <ResultBtn clickHandler={goResultPage} />
          ) : (
            <div>
              {chanceCnt === 0 ? (
                <NoIdeaBtn clickHandler={skipNextMusic} />
              ) : (
                <div>
                  {isWin && !isStart ? (
                    <NextBtn clickHandler={getNextMusic} />
                  ) : (
                    <div>
                      {isStart || musicReady ? (
                        <>
                          {playBtnList.map((item) => (
                            <PlayBtn
                              btnName={item.btnName}
                              onClickHandler={item.onClickHandler}
                              isBtnDisabled={item.isBtnDisabled}
                              key={item.btnName}
                            />
                          ))}
                        </>
                      ) : (
                        <p className="loadingMusic">...노래를 불러오는 중</p>
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
          <OptionBox />
          <HeartGauge lives={lives} />
        </S.TopRightSideContainer>
        <S.bottomRightSideContainer>
          <ChanceGauge chanceCnt={chanceCnt} />
        </S.bottomRightSideContainer>
      </S.RightSideContainer>
    </S.Container>
  );
};
