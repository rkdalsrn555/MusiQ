import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import { StyledButton } from './QuickMatchButton.styled';

interface QuickMatchButtonProps {
  channelNumber: string;
}

interface Room {
  roomTitle: string;
  roomManager: string;
  currentMembers: number;
  gameRoomNo: number;
  isPrivate: boolean;
  years: number[];
  quizAmount: number;
  isPlay: boolean;
}

export const QuickMatchButton: React.FC<QuickMatchButtonProps> = ({
  channelNumber,
}) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const fetchRooms = async () => {
    try {
      const response = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`
      );
      if (response.data.code === 200) {
        setRooms(
          Array.isArray(response.data.data.rooms)
            ? response.data.data.rooms
            : []
        );
      }
      console.log('방 목록 불러오기 성공', response.data.data.rooms);
    } catch (error) {
      console.error('방 불러오기 실패', error);
    }
  };

  const handleRoomClick = (room: any) => {
    const requestBody = {
      channelNo: parseInt(channelNumber, 10),
      roomName: room.roomTitle,
      password: '',
      musicYear: room.years,
      quizAmount: room.quizAmount,
    };
    navigate(`/multi/${channelNumber}/game/${room.gameRoomNo}`, {
      state: { requestBody },
    });
  };

  const handleQuickMatch = () => {
    fetchRooms();
    const eligibleRooms = rooms.filter(
      (room) => room.currentMembers < 6 && !room.isPlay && !room.isPrivate
    );
    if (eligibleRooms.length === 0) {
      alert('입장 가능한 방이 없습니다.');
      return;
    }
    const randomRoom =
      eligibleRooms[Math.floor(Math.random() * eligibleRooms.length)];
    handleRoomClick(randomRoom);
  };
  return (
      <StyledButton type="button" onClick={handleQuickMatch}>
        퀵매치
      </StyledButton>
  );
};
