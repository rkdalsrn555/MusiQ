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
  const accessToken = window.localStorage.getItem('userAccessToken');
  const channelNumber = location.pathname.split('/').slice(-2)[0];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApis.get(
          `${process.env.REACT_APP_BASE_URL}/game/${channelNumber}`,
          {
            headers: {
              accessToken,
            },
          }
        );

        if (response.data.code === 200) {
          console.log('통신 성공');
          console.log(response.data.data.channelUserResponseItems)
          console.log()
          const sortedUsers = response.data.data.channelUserResponseItems.sort(
            (a: UserType, b: UserType) => b.userLevel - a.userLevel
          );

          setUsers(sortedUsers);
        }
      } catch (error) {
        console.error('Fetching users failed: ', error);
      }
    };

    fetchUsers();
  }, [channelNumber, accessToken]);

  return (
    <UsersListWrapper>
      <ConnectedUserText>접속중인 유저</ConnectedUserText>
      <UserCellWrapper>
        {users.map((user) => (
          <UserCell key={user.nickname}>
            {user.nickname} - {user.userLevel}Lv
          </UserCell>
        ))}
      </UserCellWrapper>
    </UsersListWrapper>
  );
};
