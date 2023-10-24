import React, { useState } from 'react';
import { SelectLevelBtn } from '../../components/features';
import { Logo } from '../../components/utils';
import * as S from './GameOption.styled';

const yearList = [
  { title: '70년대', select: false },
  { title: '80년대', select: false },
  { title: '90년대', select: false },
  { title: '00년대', select: false },
  { title: '10년대', select: false },
  { title: '20년대', select: false },
  { title: '30년대', select: false },
];

export const GameOption = () => {
  const [selectLevelDifficulty, setLevelDifficulty] = useState<string>('easy');
  const [selectYearList, setSelectYearList] = useState<string[]>(['00년대']);

  return (
    <S.Container>
      <Logo size="sm" />
      <SelectLevelBtn />
    </S.Container>
  );
};
