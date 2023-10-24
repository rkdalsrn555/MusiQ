import React, { useState } from 'react';
import * as S from './SelectYearBtn.styled';

const yearLists = ['70', '80', '90', '00', '10', '20'];
export const SelectYearBtn = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

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

  const test = () => {
    console.log(checkedList);
  };

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
                <label htmlFor={item}>{item}년대</label>
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
            return (
              <li
                className={checkedList.includes(item) ? 'selected' : 'checkbox'}
                key={item}
              >
                <label htmlFor={item}>{item}년대</label>
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
                  return ` ${item}년대, `;
                }
                if (idx === checkedList.length - 1) {
                  return `${item}년대 `;
                }
                return `${item}년대, `;
              })}
          ]
        </p>
      </div>
    </S.Container>
  );
};
