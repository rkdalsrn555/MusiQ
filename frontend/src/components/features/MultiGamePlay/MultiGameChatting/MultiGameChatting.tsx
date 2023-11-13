import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2%;
  transform: translate(-50%, 0);
  width: 80rem;
  height: 20rem;
  border: 5px solid rgba(235, 226, 255, 0.6);
  background-color: rgba(235, 226, 255, 0.6);
`;

type OwnProps = {
  gameChatList: { nickname: string; message: string }[];
  socketClient: React.MutableRefObject<any>;
};

export const MultiGameChatting = (props: OwnProps) => {
  const { gameChatList, socketClient } = props;

  return <Container>채팅!!</Container>;
};
