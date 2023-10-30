import React, { useState, useRef, useEffect } from 'react';
import { StyledBgmBtn, ExplainBox, Container } from './BgmBtn.styled';
import playButton from '../../../assets/svgs/bgmController/playButton.svg';
import muteButton from '../../../assets/svgs/bgmController/muteButton.svg';

export const BgmBtn = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState<number>(3);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  return (
    <Container>
      <audio ref={audioRef} loop>
        <source src="/assets/bgm/pixelLand.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>

      <StyledBgmBtn type="button" onClick={handlePlayPause}>
        <img
          src={isPlaying ? playButton : muteButton} // 이미지 순서를 바꿨습니다.
          alt={isPlaying ? 'Mute' : 'Play'}
          width={100}
        />
        <ExplainBox time={time}>
          <p>배경음악을 틀어보세요!</p>
          <p>이 알림은 {time}초후에 사라집니다</p>
        </ExplainBox>
      </StyledBgmBtn>
    </Container>
  );
};
