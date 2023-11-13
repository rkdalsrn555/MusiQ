import styled from 'styled-components';

export const RoomsWrapper = styled.div`
  width: 62vw;
  height: 48vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 7%;
  left: 21%;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const Room = styled.button`
  width: 30vw;
  height: 14vh;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
`;

export const PreviousButton = styled.button`
  display: flex;
  position: absolute;
  left: -6%;
  top: 32%;
`;

export const NextButton = styled.button`
  display: flex;
  position: absolute;
  right: -6%;
  top: 32%;
`;

export const RoomNumberDiv = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: 28px;
  margin-top: 0.5%;
  margin-left: 0.3%;
`;

export const RoomTitleDiv = styled.div`
  position: absolute;
  font-size: large;
  margin-top: 4.5%;
  margin-left: 9%;
`;

export const RoomManagerDiv = styled.div`
  position: absolute;
  font-size: 18px;
  margin-top: 1%;
  margin-left: 10%;
  font-weight: bold;
`;

export const RoomYearsDiv = styled.div`
  position: absolute;
  font-size: 18px;
  margin-top: 7.5%;
  margin-left: 10%;
  color: grey;
`;

export const RoomPeopleDiv = styled.div`
  position: absolute;
  margin-top: 6.8%;
  margin-left: 44%;
`;

export const IsPrivateimg = styled.img`
  position: absolute;
  margin-top: 6.1%;
  margin-left: 40%;
`;

export const RoomQuizAmountDiv = styled.div`
  position: absolute;
  font-size: 22px;
  margin-left: 38%;
  margin-top: 1%;
`;
export const NoRoomImg = styled.img`
  margin: auto;
`;

export const PasswordModalWrapper = styled.div`
  width: 30vw;
  height: 50vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 118, 120, 1);
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 25%;
`;

export const StyledModalInput = styled.input`
  width: 14vw;
  height: 6vh;
  border-radius: 8px;
  margin-bottom: 1%;
  margin-top: 20%;
`

export const StyledExitButton = styled.button`
  position: absolute;
  top: 3%;
  right: 2%;
`

export const StyledSubmitButton = styled.button`
  width: 14vw;
  height: 8vh;
  border: 5px solid rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  background: rgba(255, 203, 21, 0.9);
  box-shadow:
    4px 4px 4px 0px rgba(0, 0, 0, 0.1) inset,
    0px 4px 4px 0px rgba(179, 179, 179, 0.25);
  font-size: 20px;
  font-weight: bold;
  margin-top: 10%;
`
export const StyledModalForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`