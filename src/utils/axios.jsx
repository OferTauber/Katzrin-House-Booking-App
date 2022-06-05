import axios from 'axios';

export const getUsersList = async () => {
  const data = await axios.get(
    'https://629cd590e9358232f7615b13.mockapi.io/users'
  );
  return data;
};
