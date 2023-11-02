import axios from 'axios';

export const getMusicUrl = axios.get(
  `${process.env.REACT_APP_BASE_URL}/music/guest/quiz?difficulty={difficulty}&year={year}`
);
