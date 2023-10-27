import { FC } from 'react';
import { StyledBubble, StyledFont } from './SpeechBubbleText.styled';

interface SpeechBubbleTextProps {
  correctAnswerCnt: number;
}

export const SpeechBubbleText: FC<SpeechBubbleTextProps> = ({
  correctAnswerCnt,
}) => {
  let messages = ['결과창입니다'];

  if (correctAnswerCnt >= 1 && correctAnswerCnt <= 3) {
    // 맞춘 개수에 따라 각기 다른 대사를 출력하자
    messages = [
      `${correctAnswerCnt}개 밖에 못 맞혔어...`,
      '조금 더 분발해봐!',
      '더 많은 문제를 맞혀보자!',
    ];
  } else if (correctAnswerCnt >= 4 && correctAnswerCnt <= 7) {
    messages = [
      `${correctAnswerCnt}개 맞혔어!`,
      '잘했어! 계속 노력하자!',
      '더 많은 문제를 맞혀볼 수 있을 거야!',
    ];
  } else if (correctAnswerCnt >= 8 && correctAnswerCnt <= 10) {
    messages = [
      `${correctAnswerCnt}개나 맞혔구나!!`,
      '대단해! 거의 다 맞혔어!',
      '친구들에게 결과를 자랑해보자!',
    ];
  } else {
    messages = [
      '하나도 못 맞혔어...',
      '다음번엔 맞힐 수 있을거야.',
      '친구와 같이 맞혀봐!!!',
    ];
  }

  return (
    <StyledBubble>
      {messages.map((message) => (
        <StyledFont key={message}>{message}</StyledFont>
      ))}
    </StyledBubble>
  );
};
