import { FC } from 'react';
import { StyledBubble, StyledFont } from './SpeechBubbleText.styled';

interface SpeechBubbleTextProps {
  correctAnswerCnt: number;
}

export const SpeechBubbleText: FC<SpeechBubbleTextProps> = ({
  correctAnswerCnt,
}) => (
  <StyledBubble>
    <StyledFont>축하해! 총 {correctAnswerCnt}문제를 맞췄어.</StyledFont>
    <StyledFont>친구들과 결과를 공유하고,</StyledFont>
    <StyledFont>기록을 자랑해봐!!!</StyledFont>
  </StyledBubble>
);
