import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { SelectLevelBtn, SelectYearBtn } from '../../components/features';
import { ReactComponent as StartIcon } from '../../assets/svgs/startBtn.svg';
import { Logo, BackBtn } from '../../components/utils';
import * as S from './GameOption.styled';

const EASYTIME = 2000;
const NORMALTIME = 1000;
const HARDTIME = 500;
const optionList = ['난이도 선택', '년도 선택', '선택한 년도'];
const levelLists = [
  { title: 'easy', select: false, time: EASYTIME },
  { title: 'normal', select: false, time: NORMALTIME },
  { title: 'hard', select: false, time: HARDTIME },
];

export const GameOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [levelList, setLevelList] = useState<{
    title: string;
    select: boolean;
    time: number;
  }>({ title: 'easy', select: false, time: EASYTIME });

  // 결과창에서 다시하기 버튼 클릭 시 옵션 그대로 가져오기 위해 작성한 코드
  useEffect(() => {
    if (location.state) { // location.state 있을 경우에만 실행. RetryButton 컴포넌트에서 전달된 state 객체
      const { mode, selectYear } = location.state; // location.state 객체에서 mode와 selectYear 추출
      setCheckedList(selectYear); // 
      
      const timeMapping = {
        easy: EASYTIME,
        normal: NORMALTIME,
        hard: HARDTIME
      };
      
      setLevelList({ // 난이도에 따라 동적으로 time 할당
        title: mode,
        select: true,
        time: timeMapping[mode as 'easy' | 'normal' | 'hard']
      });
    }
  }, []); 

  // eslint-disable-next-line no-shadow
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);

      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const handleClickRadioButton = (e: any) => {
    let tempTime;
    if (e.target.value === 'easy') {
      tempTime = EASYTIME;
    } else if (e.target.value === 'normal') {
      tempTime = NORMALTIME;
    } else {
      tempTime = HARDTIME;
    }
    setLevelList({ title: e.target.value, select: true, time: tempTime });
  };

  // 옵션 선택한거 play 페이지로 location.state로 넘겨주기
  const sendOptionToGamePlayPage = () => {
    if (checkedList.length === 0) {
      alert('년도를 선택해주세요');
      return;
    }

    const selectOptionList = {
      checkDifficulty: levelList,
      yearCheckedList: checkedList,
    };

    navigate('/guest/game-play', { state: selectOptionList });
  };

  return (
    <S.Wrapper>
      <BackBtn url="/select-mode" />
      <S.Container>
        <Logo size="sm" />
        <S.OptionContainer>
          <S.TitleContainer>
            <ul>
              {optionList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </S.TitleContainer>
          <S.ContentContainer>
            <SelectLevelBtn
              levelLists={levelLists}
              handleClickRadioButton={handleClickRadioButton}
              levelList={levelList}
            />
            <SelectYearBtn
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              checkedItemHandler={checkedItemHandler}
              checkHandler={checkHandler}
            />
          </S.ContentContainer>
        </S.OptionContainer>
        <StartIcon width={200} onClick={sendOptionToGamePlayPage} />
      </S.Container>
    </S.Wrapper>
  );
};
