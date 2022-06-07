import axios from 'axios';

const URL = 'https://629cd590e9358232f7615b13.mockapi.io/';
const URL_RESERVATIONS = URL + 'reservations';
const URL_USERS = URL + 'users';

export const getUsersList = async () => {
  const data = await axios.get(URL_USERS);
  return data;
};

export const postReservation = async (reservation) => {
  axios.post(URL_RESERVATIONS, reservation);
};

export const getAllReservations = async () => {
  const data = await axios.get(URL_RESERVATIONS);
  return data.data;
};

export const deleteReservationAPI = async (id) => {
  axios.delete(URL_RESERVATIONS + '/' + id);
};

export const editReservation = async (id, updatedReservation) => {
  axios.put(URL_RESERVATIONS + '/' + id, updatedReservation);
};

export const postNewReservation = async (newReservation) => {
  axios.post(URL_RESERVATIONS, newReservation);
};

export const postNewUser = async (newUser) => {
  axios.post(URL_USERS, newUser);
};
