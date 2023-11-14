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

  const handleRoomClick = (room: any) => {
    const requestBody = {
      channelNo: parseInt(channelNumber, 10),
      roomName: room.roomTitle,
      password: '',
      musicYear: room.years,
      quizAmount: room.quizAmount,
    };
    console.log(requestBody);
    navigate(`/multi/${channelNumber}/game/${room.gameRoomNo}`, {
      state: { requestBody },
    });
  };

  const handleQuickMatch = () => {
    userApis
      .get(`${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`)
      .then((response) => {
        if (response.data.code === 200) {
          const fetchedRooms = Array.isArray(response.data.data.rooms)
            ? response.data.data.rooms
            : [];

          const eligibleRooms = fetchedRooms.filter(
            (room: any) =>
              room.currentMembers < 6 && !room.isPlay && !room.isPrivate
          );

          if (eligibleRooms.length === 0) {
            alert('입장 가능한 방이 없습니다.');
            return;
          }

          const randomRoom =
            eligibleRooms[Math.floor(Math.random() * eligibleRooms.length)];
          handleRoomClick(randomRoom);
        }
      })
      .catch((error) => {
        console.error('방 불러오기 실패', error);
      });
  };
  return (
    <StyledButton type="button" onClick={handleQuickMatch}>
      퀵매치
    </StyledButton>
  );
};
