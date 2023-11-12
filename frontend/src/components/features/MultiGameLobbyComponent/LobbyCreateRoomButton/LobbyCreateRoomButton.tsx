import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { userApis } from '../../../../hooks/api/userApis';
import {
  ButtonsWrapper,
  StyledModal,
  StyledCreateRoomButton,
  StyledRoomPasswordInput,
  StyledRoomTitleInput,
  SelectQuizAmoutWrapper,
  SelectYearWrapper,
  StyledExitButton,
  StyledCheckbox,
  StyledRadio,
  StyledAmountLabel,
  StyledYearLabel,
} from './LobbyCreateRoomButton.styled';
import exitButtonIcon from '../../../../assets/svgs/MultiLobby/exitButtonIcon.svg';
import musiqLogo from '../../../../assets/svgs/logo.svg';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    roomName: string,
    password: string,
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

    if (roomName.trim() === '') {
      alert('방 제목을 입력해주세요.');
      return;
    }

    if (musicYear.length === 0) {
      alert('연도를 선택해주세요.');
      return;
    }

    if (quizAmount === 0) {
      alert('문제 개수를 선택해주세요.');
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  onCreate(roomName, password, musicYear.join(' '), quizAmount);

  if (!isOpen) {
    return null;
  }

  return (
    <StyledModal className="modal">
      <img src={musiqLogo} alt="logo" width={200} />
      <StyledExitButton type="button" onClick={onClose}>
        <img src={exitButtonIcon} alt="창 닫기" width={50} />
      </StyledExitButton>
      <StyledRoomTitleInput
        placeholder="&nbsp;방 제목"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        autoComplete="off"
      />
      <StyledRoomPasswordInput
        placeholder="&nbsp;비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      <SelectYearWrapper>
        <div style={{ fontSize: '18px' }}>노래의 연도를 선택 해주세요</div>
        {yearsOptions.map((year) => (
          <StyledYearLabel key={year} style={{ fontSize: '20px' }}>
            <StyledCheckbox
              type="checkbox"
              value={year}
              checked={musicYear.includes(year)}
              onChange={() => toggleYearSelection(year)}
            />
            &nbsp;{year}
          </StyledYearLabel>
        ))}
      </SelectYearWrapper>
      <SelectQuizAmoutWrapper>
        <div style={{ fontSize: '18px' }}>문제 개수를 선택 해주세요</div>
        {quizAmountOptions.map((amount) => (
          <StyledAmountLabel key={amount} style={{ fontSize: '20px' }}>
            <StyledRadio
              type="radio"
              name="quizAmount"
              value={amount}
              checked={quizAmount === amount}
              onChange={() => handleQuizAmountChange(amount)}
            />
            &nbsp;{amount}
          </StyledAmountLabel>
        ))}
      </SelectQuizAmoutWrapper>
      <StyledCreateRoomButton type="button" onClick={handleCreateRoom}>
        방 만들기
      </StyledCreateRoomButton>
    </StyledModal>
  );
};

type OwnProps = {
  topicNumber: React.MutableRefObject<number>;
  setIsRoomExisted: Dispatch<SetStateAction<boolean>>;
};

export const LobbyCreateRoomButton = (props: OwnProps) => {
  const { topicNumber, setIsRoomExisted } = props;
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

  type RequestBody = {
    channelNo: number;
    roomName: string;
    password: string;
    musicYear: string;
    quizAmount: number;
  };

  const joinGameRoom = (gameRoomNo: number, requestBody: RequestBody) => {
    userApis
      .patch(`${process.env.REACT_APP_BASE_URL}/game/main/join/${channelNo}`)
      .then((res) => {
        topicNumber.current = gameRoomNo;
        setIsRoomExisted(true);
      });
  };

  const handleCreateRoom = (
    roomName: string,
    password: string,
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
    userApis
      .post(`${process.env.REACT_APP_BASE_URL}/game/main/create`, requestBody)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(channelNo);
          console.log(requestBody);
          joinGameRoom(response.data.data.gameRoomNo, requestBody);
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
      <ButtonsWrapper onClick={handleOpenModal}>방 만들기</ButtonsWrapper>
      <LobbyCreateRoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};
