import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  RoomsWrapper,
  Room,
  PreviousButton,
  NextButton,
} from './LobbyRooms.styled';
import previousButton from '../../../../assets/svgs/modeSelectSvgs/nextButton.svg';

interface Room {
  roomTitle: string;
  roomManager: string;
  currentMembers: number;
  roomNumber: number;
  isPrivate: boolean;
  years: number[];
}

export const LobbyRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 한 페이지에 표시할 방의 수
  const location = useLocation();
  const channelNumber = location.pathname.split('/').slice(-2)[0];
  const accessToken = window.localStorage.getItem('userAccessToken');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`,
          {
            headers: {
              accessToken,
            },
          }
        );

        if (response.data.code === 200) {
          setRooms(response.data.rooms);
        }
      } catch (error) {
        console.error('Fetching rooms failed: ', error);
      }
    };

    fetchRooms();
  }, [channelNumber, accessToken]);

  // 페이지네이션을 위한 시작점과 끝점 계산
  const indexOfLastRoom = currentPage * pageSize;
  const indexOfFirstRoom = indexOfLastRoom - pageSize;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // 방의 years 배열에서 최소값과 최대값을 계산하는 함수
  const getYearsRange = (years: number[]) => {
    if (years.length === 1) return `${years[0]}`;
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return `${minYear} ~ ${maxYear}`;
  };

  // 이전 버튼 핸들러
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(rooms.length / pageSize))
    );
  };

  return (
    <RoomsWrapper>
      {currentRooms.map((room) => (
        <Room key={room.roomManager}>
          {room.roomTitle} - {room.roomManager} - {getYearsRange(room.years)} -
          {room.currentMembers} - {room.isPrivate} - {room.roomNumber}
        </Room>
      ))}
      <PreviousButton type="button" onClick={handlePrevious}>
        <img
          src={previousButton}
          alt="이전 버튼"
          style={{ rotate: '180deg', opacity: 0.6 }}
          width={80}
        />
      </PreviousButton>
      <NextButton type="button" onClick={handleNext}>
        <img
          src={previousButton}
          alt="다음 버튼"
          style={{ opacity: 0.6 }}
          width={80}
        />
      </NextButton>
    </RoomsWrapper>
  );
};
