import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;

  & .selected {
    width: 10rem;
    height: 5rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #5024ff;
    margin-right: 1rem;

    & label {
      line-height: 5rem;
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
    }
  }

  & .checkbox {
    width: 10rem;
    height: 5rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #fff;
    margin-right: 1rem;

    & label {
      line-height: 5rem;
      font-size: 2rem;
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
    }
  }

  & .selectList {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;

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
