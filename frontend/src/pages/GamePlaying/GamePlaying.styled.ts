import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  & .emptyBox {
    flex-flow: 1;
    width: 10rem;
  }
`;

// 가운데 병아리랑 인풋 묶어서 가운데 배치
export const MiddleContainer = styled.div`
  padding-left: 8rem;
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 옵션, 하트, 기회, 선택버튼 묶어서 우측으로 배치
export const RightSideContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-right: 5%;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const TopRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const bottomRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

export const PlayingBtnBoxPosition = styled.div`
  width: 24rem;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
`;
