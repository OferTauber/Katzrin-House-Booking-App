import { createContext, useState, useContext } from 'react';

export const globalContext = createContext();

export const useGlobalContext = () => {
  const {
    user,
    setUser,
    usersList,
    setUsersList,
    // reservationsList,
    // setReservationsList,
  } = useContext(globalContext);
  return {
    user,
    setUser,
    usersList,
    setUsersList,
    // reservationsList,
    // setReservationsList,
  };
};
export const useUser = () => {
  const { user, setUser } = useContext(globalContext);
  return { user, setUser };
};
export const useUsersList = () => {
  const { usersList, setUsersList } = useContext(globalContext);
  return { usersList, setUsersList };
};
// export const useReservationsList = () => {
//   const { reservationsList, setReservationsList } = useContext(globalContext);
//   return { reservationsList, setReservationsList };
// };

function ContextProvider({ children }) {
  const [user, setUser] = useState({
    name: undefined,
    email: undefined,
    picture: undefined,
    id: undefined,
    // ! temp!
    // name: 'עופר',
    // email: undefined,
    // picture: undefined,
    // id: 1,
    // ! temp!
  });
  const [usersList, setUsersList] = useState([]);
  const [reservationsList, setReservationsList] = useState([]);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        usersList,
        setUsersList,
        reservationsList,
        setReservationsList,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default ContextProvider;
