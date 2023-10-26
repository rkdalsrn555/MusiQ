import { FC } from 'react';
import { Logo } from '../../../utils/Logo/Logo';
import { ShareButton } from '../ShareButton';
import { SpeechBubbleText } from '../SpeechBubbleText';
import {
  InfoWrapper,
  ChickWrapper,
  ResultContainer,
  DancingChickContainer,
} from './ResultInfo.styled';
import { ResultInfoText } from '../ResultInfoText';
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
        <SpeechBubbleText />
      </DancingChickContainer>
    </ChickWrapper>
    <InfoWrapper>
      <div style={{ marginLeft: '3.5rem' }}>
        <Logo size="lg" />
      </div>
      <ResultInfoText />
      <ShareButton />
    </InfoWrapper>
  </ResultContainer>
);
