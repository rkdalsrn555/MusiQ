import styled from 'styled-components';

export const InfoWrapper = styled.div`
  width: 35rem;
  height: 42rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
  margin-top: 10rem;
`;

export const ChickWrapper = styled.div`
  width: 35rem;
  height: 42rem;
  flex-shrink: 0;
  display: flex;
  margin-top: 10rem;
  justify-content: center;
  align-items: center;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DancingChickContainer = styled.div`
  position: relative;
  width: 29rem;
  height: 20rem;
  top: 10%;

  & img:nth-child(1) {
    position: absolute;
    top: 10%;
    bottom: 0;
    left: 12%;
    right: 0;
    z-index: 2;
  }

  & img:nth-child(2) {
    position: absolute;
    top: 70%;
    left: 0;
    right: 0;
    z-index: 1;
  }

  & img:nth-child(3) {
    position: absolute;
    bottom: 50%;
    left: 30%;
    right: 0;
  }
`;
