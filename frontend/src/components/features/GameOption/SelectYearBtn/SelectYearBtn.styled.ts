import styled from 'styled-components';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & li:hover {
    background-color: #5024ff;

    label {
      color: #fff;
    }
  }

  & .selected {
    width: 9rem;
    height: 4rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #5024ff;
    margin-right: 1rem;

    :hover,
    :active {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }

    & label {
      padding: 1rem;
      line-height: 4rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }
  }

  & .checkbox {
    width: 9rem;
    height: 4rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #fff;
    margin-right: 1rem;

    :hover,
    :active {
      cursor:
        url(${hoverCursorIcon}) 2 2,
        auto !important;
    }

    & label {
      padding: 1rem;
      line-height: 4rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  & [type='checkbox'] {
    appearance: none;
  }

  & .selectYear {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    & h2 {
      font-size: 2rem;
      font-weight: bold;
    }

    & ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      width: 45rem;
    }
  }

  & .selectList {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
    width: 43rem;
    line-height: 2.5rem;
    margin-top: 1rem;

    & h2 {
      font-size: 2rem;
      font-weight: bold;
    }

    & p {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fcff5d;
    }
  }
`;
