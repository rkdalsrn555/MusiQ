import React, { useState, useRef } from 'react';
import { StyledBgmBtn } from './BgmBtn.styled';
import playButton from '../../../assets/svgs/bgmController/playButton.svg';
import muteButton from '../../../assets/svgs/bgmController/muteButton.svg';

export const BgmBtn = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/assets/bgm/pixelLand.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>

      <StyledBgmBtn type="button" onClick={handlePlayPause}>
        <img
          src={isPlaying ? playButton : muteButton} // 이미지 순서를 바꿨습니다.
          alt={isPlaying ? 'Mute' : 'Play'}
          width={120}
        />
      </StyledBgmBtn>
    </div>
  );
};
