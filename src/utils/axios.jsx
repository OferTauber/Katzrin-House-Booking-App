import axios from 'axios';

const URL = 'https://629cd590e9358232f7615b13.mockapi.io/';

export const getUsersList = async () => {
  const data = await axios.get(URL + 'users');
  return data;
};

export const postReservation = async (reservation) => {
  axios.post(URL + 'reservations', reservation);
};

export const getAllReservations = async () => {
  const data = await axios.get(URL + 'reservations');
  return data.data;
};

export const deleteReservation = async (id) => {
  axios.delete(URL + 'reservations/' + id);
};

export const editReservation = async (id, updatedReservation) => {
  axios.put(URL + 'reservations/' + id, updatedReservation);
};
