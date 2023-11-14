import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
} from './SearchRoomButton.styled';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      {children}
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

interface SearchRoomButtonProps {
  channelNumber: string;
}

export const SearchRoomButton: React.FC<SearchRoomButtonProps> = ({
  channelNumber,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: any) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const roomsResponse = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/main/${channelNumber}`
      );
      // eslint-disable-next-line prefer-destructuring
      const rooms = roomsResponse.data.data.rooms;
      console.log(roomNumber);
      const selectedRoom = rooms.find(
        (room: any) => room.gameRoomNo === parseInt(roomNumber, 10)
      );

      if (!selectedRoom) {
        alert('해당 번호의 방이 없습니다.');
        return;
      }

      const enterResponse = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/main/enter/${selectedRoom.gameRoomNo}`
      );

      if (enterResponse.data.code === 200) {
        const gameState = {
          channelNo: parseInt(channelNumber, 10),
        };
        navigate(`/multi/${channelNumber}/game/${selectedRoom.gameRoomNo}`, {
          state: { requestBody: gameState },
        });
      }
    } catch (error) {
      console.error('Error entering room:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        방 찾기
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <input
            type="text"
            placeholder="방 번호 입력"
            value={roomNumber}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSubmit}>
            입장
          </button>
        </Modal>
      )}
    </div>
  );
};
