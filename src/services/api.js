import axios from 'axios';
const BASE_URL = "https://starnavi-frontend-test-task.herokuapp.com"

export const getSettings = async () => {
  const response = await axios.get(
    `${BASE_URL}/game-settings`,
  );
  // console.log('response from getSettings', response);

  return response.data;
};

export const getWinners = async () => {
  const response = await axios.get(
    `${BASE_URL}/winners`,
  );
  // console.log('response from getwinners', response);

  return response.data;
};

export const postWinner = async item => {
  const response = await axios.post(
    `${BASE_URL}/winners`, item);
  console.log('response from POST', response);
  return response;
};