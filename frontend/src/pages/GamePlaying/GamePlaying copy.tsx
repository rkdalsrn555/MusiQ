import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import ReactPlayer from 'react-player';
// import { useNavigate } from 'react-router-dom';
// import {
//   OptionBox,
//   DancingChick,
//   AnswerInput,
//   HeartGauge,
//   ChanceGauge,
//   PlayBtn,
//   NoIdeaBtn,
// } from '../../components/features';
// import { BackBtn } from '../../components/utils';
// import * as S from './GamePlaying.styled';

// type musicDataType = {
//   musicId: number;
//   musicUrl: string;
// };

// const FirstMusicStartTime = 0;
// const SecondMusicStartTime = 60;
// const ThirdMusicStartTime = 120;

// export const GamePlaying = () => {
//   const navigate = useNavigate();
//   const [musicData, setMusicData] = useState<musicDataType>({
//     musicId: 2,
//     musicUrl: 'https://www.youtube.com/watch?v=JeceYRagnQE',
//   });
//   const [score, setScore] = useState<number>(0);
//   const [lives, setLives] = useState<number>(3); // 생명
//   const [chanceCnt, setChanceCnt] = useState<number>(3); // 기회
//   const [isPlaying, setIsPlaying] = useState<boolean>(false); // 게임중인지, 아닌지
//   const [isJudge, setIsJudge] = useState<boolean>(false); // 채점중인지 아닌지
//   const [musicReady, setMusicReady] = useState<boolean>(true); // 노래가 준비되었는지, 아닌지
//   const videoRef = useRef<ReactPlayer>(null);
//   const [btn1isDisabled, setIsBtn1Disabled] = useState<boolean>(false);
//   const [btn2isDisabled, setIsBtn2Disabled] = useState<boolean>(false);
//   const [btn3isDisabled, setIsBtn3Disabled] = useState<boolean>(false);

//   // 정답 담을 state
//   const [inputText, setInputText] = useState<string>('');
//   const activeButton = () => {
//     alert(`${inputText} 입력 완료`);
//   };
//   const activeEnter = (e: any) => {
//     if (inputText === '') {
//       return;
//     }
//     if (e.key === 'Enter') {
//       activeButton();
//       setInputText('');
//     }
//   };

//   // 게임 플레이 실행
//   const playMusic = (musicStartTime: number) => {
//     if (videoRef.current) {
//       videoRef.current.seekTo(musicStartTime);
//       setIsPlaying(true);
//     }
//   };

//   // 몇 초 뒤에 멈출 지 설정
//   const stopAfterSecond = (second: number) => {
//     if (isPlaying) {
//       setTimeout(() => {
//         setIsPlaying(false);
//       }, second);
//     }
//   };

//   // 버튼 리스트
//   const playBtnList = [
//     {
//       btnName: '처음',
//       // 버튼 클릭하면 노래 시작하고, 기회 감소, 버튼 못누르게 disabled 처리
//       onClickHandler: () => {
//         playMusic(FirstMusicStartTime);
//         setChanceCnt((prev) => prev - 1);
//         setIsBtn1Disabled(true);
//       },
//       isBtnDisabled: btn1isDisabled,
//     },
//     {
//       btnName: '중간',
//       onClickHandler: () => {
//         playMusic(SecondMusicStartTime);
//         setChanceCnt((prev) => prev - 1);
//         setIsBtn2Disabled(true);
//       },
//       isBtnDisabled: btn2isDisabled,
//     },
//     {
//       btnName: '끝',
//       onClickHandler: () => {
//         playMusic(ThirdMusicStartTime);
//         setChanceCnt((prev) => prev - 1);
//         setIsBtn3Disabled(true);
//       },
//       isBtnDisabled: btn3isDisabled,
//     },
//   ];

//   // 서버에서 노래 받아오기 (목데이터)
//   const getNextMusic = () => {
//     setMusicData({
//       musicId: 1,
//       musicUrl: 'https://www.youtube.com/watch?v=l-jZOXa7gQY',
//     });
//     setMusicReady(true);
//     setIsBtn1Disabled(false);
//     setIsBtn2Disabled(false);
//     setIsBtn3Disabled(false);
//     setChanceCnt(3);
//     setScore(1);
//   };

//   // 다음 문제로 넘어가기(모르겠어요 클릭)
//   // 하트 0개 이상인지 체크 후 1개 감소, 다음 노래 불러오기, 노래 불러오면 버튼 다시 활성화
//   // 하트 0개이면 결과 페이지로 라우팅
//   const skipNextMusic = () => {
//     if (lives > 0) {
//       setLives((prev) => prev - 1);
//       setMusicReady(false);
//       getNextMusic();
//     } else {
//       const resultData = {
//         mode: 'easy',
//         selectYear: '70년대',
//         correctAnswerCnt: score,
//       };
//       navigate('/', { state: resultData });
//     }
//   };

//   // 채점
//   // const getCheckAnswer =

//   // 노래 불러오기
//   // const getNextMusic = axios
//   //   .get(`${process.env.REACT_APP_BASE_URL}/`)
//   //   .then((res) => {
//   //     setMusicData({
//   //       musicId: res.data.data.musicId,
//   //       musicUrl: res.data.data.musicUrl,
//   //     });
//   //     setMusicReady(true);
//   //     setIsBtn1Disabled(false);
//   //     setIsBtn2Disabled(false);
//   //     setIsBtn3Disabled(false);
//   //     setChanceCnt(3);
//   //     setScore(res.data.data.score);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });

//   return (
//     <S.Container>
//       <BackBtn url="/guest/game-option" />
//       <ReactPlayer
//         url={musicData.musicUrl}
//         controls
//         playing={isPlaying}
//         onPlay={() => {
//           stopAfterSecond(1000);
//         }}
//         width="0"
//         height="0"
//         ref={videoRef}
//       />
//       <div className="emptyBox" />
//       <S.MiddleContainer>
//         <S.GameStatusExplainContainer>
//           <p className="explainGame">
//             처음부터 <span>{1}초간</span> 들려드립니다
//           </p>
//         </S.GameStatusExplainContainer>
//         <S.GameStatusExplainContainer>
//           {isPlaying ? (
//             <p className="gameStatus">...Playing</p>
//           ) : (
//             <div>
//               {musicReady ? (
//                 <p className="gameStatus">시작 전</p>
//               ) : (
//                 <p className="gameStatus">...노래를 불러오는 중</p>
//               )}
//             </div>
//           )}
//         </S.GameStatusExplainContainer>
//         <DancingChick />
//         <AnswerInput
//           isJudge={isJudge}
//           inputText={inputText}
//           setInputText={(e: any) => {
//             setInputText(e);
//           }}
//           activeButton={activeButton}
//           activeEnter={(e: any) => {
//             activeEnter(e);
//           }}
//         />
//         <S.PlayingBtnBoxPosition>
//           {btn1isDisabled && btn2isDisabled && btn3isDisabled ? (
//             <NoIdeaBtn clickHandler={skipNextMusic} />
//           ) : (
//             <div>
//               {musicReady ? (
//                 <>
//                   {playBtnList.map((item) => (
//                     <PlayBtn
//                       btnName={item.btnName}
//                       onClickHandler={item.onClickHandler}
//                       isBtnDisabled={item.isBtnDisabled}
//                       key={item.btnName}
//                     />
//                   ))}
//                 </>
//               ) : (
//                 <p className="loadingMusic">...노래를 불러오는 중</p>
//               )}
//             </div>
//           )}
//         </S.PlayingBtnBoxPosition>
//       </S.MiddleContainer>
//       <S.RightSideContainer>
//         <S.TopRightSideContainer>
//           <OptionBox difficulty="" />
//           <HeartGauge lives={lives} />
//         </S.TopRightSideContainer>
//         <S.bottomRightSideContainer>
//           <ChanceGauge chanceCnt={chanceCnt} />
//         </S.bottomRightSideContainer>
//       </S.RightSideContainer>
//     </S.Container>
//   );
// };
