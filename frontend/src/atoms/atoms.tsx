import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type GameOptionDataType = {
  difficulty: {
    title: string;
    select: boolean;
    time: number;
  };
  yearList: string[];
  gameRoomData: {
    roomId: number;
    round: number;
    problems: number;
  };
};

export const TempLocationStateGameInfo = atom<GameOptionDataType>({
  key: 'TempLocationStateGameInfo',
  default: {
    difficulty: {
      title: '',
      select: false,
      time: 0,
    },
    yearList: [],
    gameRoomData: {
      roomId: 0,
      round: 0,
      problems: 0,
    },
  },
});

export const UserDataAtom = atom({
  key: 'UserDataAtom',
  default: {
    nickname: '',
  },
});

export const UserIpAtom = atom({
  key: 'UserIpAtom',
  default: {
    ip: '',
  },
});
