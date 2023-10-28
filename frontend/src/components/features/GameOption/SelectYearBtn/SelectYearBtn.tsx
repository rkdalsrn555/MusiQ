import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './SelectYearBtn.styled';

const yearLists = [
  '1970',
  '1980',
  '1990',
  '2000',
  '2010',
  '2015',
  '2020',
  '2021',
  '2022',
  '2023',
];

const renderYearList = [
  '1970~79년',
  '1980~89년',
  '1990~99년',
  '2000~09년',
  '2010~14년',
  '2015~19년',
  '2020년',
  '2021년',
  '2022년',
  '2023년',
];

type OwnProps = {
  checkedList: string[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  checkedItemHandler: (value: string, isChecked: boolean) => void;
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

export const SelectYearBtn = (props: OwnProps) => {
  const {
    checkedList,
    setCheckedList,
    isChecked,
    setIsChecked,
    checkedItemHandler,
    checkHandler,
  } = props;

  return (
    <S.Container>
      <div className="selectYear">
        <h2>1900년</h2>
        <ul>
          {yearLists.map((item, idx) => {
            if (idx >= 3) {
              return '';
            }
            return (
              <li
                className={checkedList.includes(item) ? 'selected' : 'checkbox'}
                key={item}
              >
                <label htmlFor={item}>{item}년~</label>
                <input
                  type="checkbox"
                  id={item}
                  checked={checkedList.includes(item)}
                  onChange={(e) => checkHandler(e, item)}
                />
              </li>
            );
          })}
        </ul>
        <h2>2000년</h2>
        <ul>
          {yearLists.map((item, idx) => {
            if (idx < 3) {
              return '';
            }
            if (idx >= 3 && idx < 7) {
              return (
                <li
                  className={
                    checkedList.includes(item) ? 'selected' : 'checkbox'
                  }
                  key={item}
                >
                  <label htmlFor={item}>{item}년~</label>
                  <input
                    type="checkbox"
                    id={item}
                    checked={checkedList.includes(item)}
                    onChange={(e) => checkHandler(e, item)}
                  />
                </li>
              );
            }
            return (
              <li
                className={checkedList.includes(item) ? 'selected' : 'checkbox'}
                key={item}
              >
                <label htmlFor={item}>{item}년</label>
                <input
                  type="checkbox"
                  id={item}
                  checked={checkedList.includes(item)}
                  onChange={(e) => checkHandler(e, item)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="selectList">
        <p>
          [
          {checkedList.length === 0
            ? ' 플레이 할 년도를 선택해주세요 '
            : checkedList.map((item, idx) => {
                if (idx === 0) {
                  return ` ${item}, `;
                }
                if (idx === checkedList.length - 1) {
                  return `${item} `;
                }
                return `${item}, `;
              })}
          ]
        </p>
      </div>
    </S.Container>
  );
};
