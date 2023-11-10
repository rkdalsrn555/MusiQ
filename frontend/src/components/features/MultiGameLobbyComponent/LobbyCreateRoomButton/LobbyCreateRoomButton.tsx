import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { userApis } from '../../../../hooks/api/userApis';
import { ButtonsWrapper } from './LobbyCreateRoomButton.styled';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    roomName: string,
    password: number,
    musicYear: string,
    quizAmount: number
  ) => void;
}

const LobbyCreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [musicYear, setMusicYear] = useState<string[]>([]);
  const [quizAmount, setQuizAmount] = useState<number>(0);
  const quizAmountOptions = [10, 20, 30];
  const yearsOptions = [
    '1970',
    '1980',
    '1990',
    '2000',
    '2010',
    '2015',
    '2020',
    '2021',
    '2022',
    '2023',
  ];

  // 연도 선택 핸들러
  const toggleYearSelection = (year: string) => {
    setMusicYear((prevYears) => {
      if (prevYears.includes(year)) {
        // 이미 연도가 선택되어 있다면 제거
        return prevYears.filter((y) => y !== year);
      }
      // 연도가 선택되어 있지 않다면 추가
      return [...prevYears, year];
    });
  };

  // 퀴즈 개수 선택 핸들러
  const handleQuizAmountChange = (amount: number) => {
    setQuizAmount(amount);
  };

  // 방 생성 핸들러
  const handleCreateRoom = () => {
    // 입력 검증 로직
    const numericPassword = parseInt(password, 10);
    onCreate(roomName, numericPassword, musicYear.join(' '), quizAmount);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <input
        type="text"
        placeholder="방 제목"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        {yearsOptions.map((year) => (
          <label key={year}>
            <input
              type="checkbox"
              value={year}
              checked={musicYear.includes(year)}
              onChange={() => toggleYearSelection(year)}
            />
            {year}
          </label>
        ))}
      </div>
      <div>
        {quizAmountOptions.map((amount) => (
          <label key={amount}>
            <input
              type="radio"
              name="quizAmount"
              value={amount}
              checked={quizAmount === amount}
              onChange={() => handleQuizAmountChange(amount)}
            />
            {amount}개
          </label>
        ))}
      </div>
      <button type="button" onClick={handleCreateRoom}>
        확인
      </button>
      <button type="button" onClick={onClose}>
        닫기
      </button>
    </div>
  );
};

export const LobbyCreateRoomButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const channelNo = location.pathname.split('/').slice(-2)[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRoom = (
    roomName: string,
    password: number,
    musicYear: string,
    quizAmount: number
  ) => {
    const requestBody = {
      channelNo: parseInt(channelNo, 10),
      roomName,
      password,
      musicYear,
      quizAmount,
    };
    const accessToken = window.localStorage.getItem('userAccessToken');
    axios

      .post(`${process.env.REACT_APP_BASE_URL}/game/main/create`, requestBody, {
        headers: {
          accessToken,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          navigate(`/multi/${channelNo}/room/${response.data.data.gameRoomNo}`);
        } else {
          console.error('Failed to create room:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error creating room:', error);
      });

    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <ButtonsWrapper onClick={handleOpenModal}>
        방 만들기
      </ButtonsWrapper>
        <LobbyCreateRoomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateRoom}
        />
    </div>
  );
};
