import styled from 'styled-components';

export const RoomsWrapper = styled.div`
  width: 62vw;
  height: 48vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 7%;
  left: 21%;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const Room = styled.button`
  width: 28vw;
  height: 14vh;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
