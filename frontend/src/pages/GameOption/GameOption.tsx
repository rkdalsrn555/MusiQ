import { useNavigate } from 'react-router-dom';
import { SelectLevelBtn, SelectYearBtn } from '../../components/features';
import { ReactComponent as StartIcon } from '../../assets/svgs/startBtn.svg';
import { Logo, BackBtn } from '../../components/utils';
import * as S from './GameOption.styled';

export const GameOption = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <BackBtn url="/select-mode" />
      <S.Container>
        <Logo size="sm" />
        <S.OptionContainer>
          <S.TitleContainer>
            <ul>
              <li>난이도 선택</li>
              <li>년도 선택</li>
              <li>선택한 년도</li>
            </ul>
          </S.TitleContainer>
          <S.ContentContainer>
            <SelectLevelBtn />
            <SelectYearBtn />
          </S.ContentContainer>
        </S.OptionContainer>
        <StartIcon
          width={200}
          onClick={() => {
            navigate('/');
          }}
        />
      </S.Container>
    </S.Wrapper>
  );
};
