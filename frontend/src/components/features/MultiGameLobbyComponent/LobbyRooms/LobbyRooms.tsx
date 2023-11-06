import React from 'react';
import styled from 'styled-components';
import { RoomsWrapper, Room } from './LobbyRooms.styled';
import previousButton from '../../../../assets/svgs/modeSelectSvgs/nextButton.svg';

export const LobbyRooms = () => (
  <RoomsWrapper>
    <Room>Lobby Room 1</Room>
    <Room>Lobby Room 2</Room>
    <Room>Lobby Room 3</Room>
    <Room>Lobby Room 4</Room>
    <Room>Lobby Room 5</Room>
    <Room>Lobby Room 6</Room>
  </RoomsWrapper>
);
