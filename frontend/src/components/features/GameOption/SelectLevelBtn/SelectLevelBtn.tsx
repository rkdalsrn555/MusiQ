import React, { useState } from 'react';
import * as S from './SelectLevelBtn.styled';
import { ReactComponent as CircleIcon } from '../../../../assets/svgs/circle.svg';

const EASYTIME = 2;
const NORMALTIME = 1;
const HARDTIME = 0.5;

const levelLists = [
  { title: 'easy', select: false, time: EASYTIME },
  { title: 'normal', select: false, time: NORMALTIME },
  { title: 'hard', select: false, time: HARDTIME },
];

export const SelectLevelBtn = () => {
  const [levelList, setLevelList] = useState<{
    title: string;
    select: boolean;
    time: number;
  }>({ title: 'easy', select: false, time: EASYTIME });

  const handleClickRadioButton = (e: any) => {
    let tempTime = 0;
    if (e.target.value === 'easy') {
      tempTime = EASYTIME;
    } else if (e.target.value === 'normal') {
      tempTime = NORMALTIME;
    } else {
      tempTime = HARDTIME;
    }
    setLevelList({ title: e.target.value, select: true, time: tempTime });
  };

  return (
    <S.Container>
      <h2>난이도</h2>
      <ul>
        {levelLists.map((item) => (
          <li key={item.title}>
            <label htmlFor={item.title}>
              <span>{item.title}</span>
              <input
                type="radio"
                value={item.title}
                id={item.title}
                checked={levelList.title === item.title}
                onChange={handleClickRadioButton}
              />
              <S.SelectRadioStyle>
                <CircleIcon width={40} height={30} />
                {levelList.title === item.title ? (
                  <div className="circle" />
                ) : (
                  ''
                )}
              </S.SelectRadioStyle>
            </label>
          </li>
        ))}
        <p>
          노래의 처음, 중간, 끝을 <span>{levelList.time}</span> 초간
          들려드립니다
        </p>
      </ul>
    </S.Container>
  );
};

export default SelectLevelBtn;
