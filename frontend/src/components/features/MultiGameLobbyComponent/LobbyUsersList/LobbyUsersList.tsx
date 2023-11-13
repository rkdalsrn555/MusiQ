import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { userApis } from '../../../../hooks/api/userApis';
import {
  UsersListWrapper,
  UserCellWrapper,
  UserCell,
  ConnectedUserText,
} from './LobbyUsersList.styled';

type UserType = {
  nickname: string;
  userLevel: number;
};

export const LobbyUsersList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const location = useLocation();
  const myNickname = window.localStorage.getItem('nickname');
  const accessToken = window.localStorage.getItem('userAccessToken');
  const channelNumber = location.pathname.split('/').slice(-2)[0];

  const fetchUsers = async () => {
    try {
      const response = await userApis.get(
        `${process.env.REACT_APP_BASE_URL}/game/${channelNumber}`
      );

      if (response.data.code === 200) {
        const sortedUsers = response.data.data.channelUserResponseItems.sort(
          (a: UserType, b: UserType) => b.userLevel - a.userLevel
        );
        setUsers(sortedUsers);
        console.log('유저목록', sortedUsers);
      }
    } catch (error) {
      console.error('Fetching users failed: ', error);
    }
  };

  useEffect(() => {
    // myNickname이 users 배열에 없을 경우에만 fetchUsers 호출
    const isMyNicknamePresent = users.some(
      (user) => user.nickname === myNickname
    );
    if (!isMyNicknamePresent) {
      fetchUsers();
    }
  }, [users]);

  return (
    <UsersListWrapper>
      <ConnectedUserText>접속중인 유저</ConnectedUserText>
      <UserCellWrapper>
        {users.map((user) => (
          <UserCell key={user.nickname}>
            {user.nickname} {user.userLevel}Lv
          </UserCell>
        ))}
      </UserCellWrapper>
    </UsersListWrapper>
  );
};
