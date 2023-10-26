import { FC } from 'react';
import {
  InfoWrapper,
  ChickWrapper,
  ResultContainer,
  DancingChickContainer,
} from './ResultInfo.styled';
import { SpeechBubbleText } from '../SpeechBubbleText';
import DanceChick from '../../../../assets/img/playgame/danceChick.gif';
import WaveBar from '../../../../assets/img/playgame/wave.png';
import SpeechBubble from '../../../../assets/img/playgame/speechBubble.png';

export const ResultInfo = () => (
  <ResultContainer>
    <ChickWrapper>
      <DancingChickContainer>
        <img src={DanceChick} alt="DanceChick" width={300} />
        <img src={WaveBar} alt="WaveBar" width={400} />
        <img src={SpeechBubble} alt="SpeechBubble" width={400} />
      </DancingChickContainer>
    </ChickWrapper>
    <InfoWrapper>this is wrapper</InfoWrapper>
  </ResultContainer>
);
