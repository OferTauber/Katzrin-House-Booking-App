import axios from 'axios';

const URL = 'https://629cd590e9358232f7615b13.mockapi.io/';

const URL_RESERVATIONS = URL + 'reservations';
const URL_USERS = URL + 'users';
const URL_PANTRY = URL + 'pantry/1';
const URL_UPDATES = URL + 'updates';

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

export const fetchPantry = async () => {
  const data = await axios.get(URL_PANTRY);
  return data;
};

export const updatePantry = async (newPantryArray, date, userId) => {
  const updatedPantry = {
    items: newPantryArray,
    update: date,
    updatedBy: userId,
  };
  axios.put(URL_PANTRY, updatedPantry);
};

export const getUpdats = async () => {
  const data = await axios.get(URL_UPDATES);
  return data.data;
};

export const postUpdate = async (newUpdate) => {
  axios.post(URL_UPDATES, newUpdate);
};
