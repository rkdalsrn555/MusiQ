import { useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { StyledResultText } from './ResultInfoText.styled';

interface ResultInfoTextProps {
  mode: string;
  selectYear: string[];  // 선택한 연도들이 문자 배열로 들어옴
  correctAnswerCnt: number;
}

export const ResultInfoText: FC<ResultInfoTextProps> = ({
  mode,
  selectYear,
  correctAnswerCnt,
}) => {
  // selectYear가 정의되어 있고 배열이면 실행
  let displayYear = '';

  if (selectYear && Array.isArray(selectYear)) {
    const years = selectYear.map((year) => parseInt(year, 10)); // 문자배열 숫자배열로 변환
    const minYear = Math.min(...years); // 배열의 최소값 구하기
    const maxYear = Math.max(...years); // 배열의 최대값 구하기
    displayYear = `${minYear}년 ~ ${maxYear}년`;
  }
  return (
    <div>
      <StyledResultText>{displayYear} 랜덤 문제</StyledResultText>
      <StyledResultText>{mode} 모드로</StyledResultText>
      <StyledResultText>
        연속 {correctAnswerCnt}문제를 맞췄습니다!
      </StyledResultText>
    </div>
  );
};
