import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ButtonsWrapper,
  PasswordModalOverlay,
} from './SearchRoomButton.styled';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

interface Room {
  gameRoomNo: number;
  isPrivate: boolean;
  roomTitle: string;
  years: number[];
  quizAmount: number;
  // 여기에 Room 객체의 다른 속성들을 추가하세요.
}

interface SearchRoomButtonProps {
  channelNumber: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      {children}
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

const PasswordModal: React.FC<{ onSubmit: (password: string) => void }> = ({
  onSubmit,
}) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <PasswordModalOverlay>
      <ModalContent>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button type="button" onClick={handleSubmit}>
          확인
        </button>
      </ModalContent>
    </PasswordModalOverlay>
  );
};

export const SearchRoomButton: React.FC<SearchRoomButtonProps> = ({
  channelNumber,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const navigate = useNavigate();

  const enterRoom = async (password: string) => {
    if (!selectedRoom) return;
    const enterResponse = await userApis.get(
      `${process.env.REACT_APP_BASE_URL}/game/main/enter/${selectedRoom.gameRoomNo}`
    );

    if (enterResponse.data.code === 200) {
      const gameState = {
        channelNo: parseInt(channelNumber, 10),
        roomName: selectedRoom.roomTitle,
        musicYear: selectedRoom.years,
        quizAmount: selectedRoom.quizAmount,
        data: enterResponse.data.data,
        password,
      };
      navigate(`/multi/${channelNumber}/game/${selectedRoom.gameRoomNo}`, {
        state: { requestBody: gameState },
      });
    }
  };

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

      if (roomsResponse.data.code === 200) {
        const { rooms } = roomsResponse.data.data;
        const foundRoom = rooms.find(
          (room: any) => room.gameRoomNo === parseInt(roomNumber, 10)
        );

        setSelectedRoom(foundRoom);

        if (!foundRoom) {
          alert('해당 번호의 방이 없습니다.');
          return;
        }

        if (foundRoom.isPrivate) {
          setIsPasswordModalOpen(true);
        } else {
          enterRoom(''); // 비밀번호가 없는 경우
        }
      } else {
        alert('방 목록을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error entering room:', error);
      alert('방에 입장하는 동안 오류가 발생했습니다.');
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!selectedRoom) return;
    setIsPasswordModalOpen(false);
    try {
      const passwordResponse = await userApis.post(
        `${process.env.REACT_APP_BASE_URL}/game/main/password`,
        {
          gameRoomNo: selectedRoom.gameRoomNo,
          password,
        }
      );
      console.log('들어간 방', selectedRoom.gameRoomNo)
      console.log('입력한 번호:', password);
      console.log('비밀번호 검증', passwordResponse.data.data);
      if (
        passwordResponse.data.code === 200 &&
        passwordResponse.data.data.isCorrectPassword
      ) {
        enterRoom(password);
      } else {
        alert('잘못된 비밀번호입니다.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
    }
  };

  return (
    <ButtonsWrapper>
      <button type="button" onClick={handleOpenModal}>
        방 찾기
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <input
            placeholder="방 번호 입력"
            value={roomNumber}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <button type="button" onClick={handleSubmit}>
            입장
          </button>
        </Modal>
      )}
      {isPasswordModalOpen && <PasswordModal onSubmit={handlePasswordSubmit} />}
    </ButtonsWrapper>
  );
};
