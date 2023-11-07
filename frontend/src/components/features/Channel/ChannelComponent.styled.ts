import styled from 'styled-components';

export const ChannelItemsWrapper = styled.button`
  width: 30vw;
  height: 50vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
`

export const ChannelItem = styled.button`
  width: 14vw;
  height: 9vh;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`