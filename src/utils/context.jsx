import { createContext, useState, useContext } from 'react';

export const globalContext = createContext();

export const useGlobalContext = () => {
  const { user, setUser, usersList, setUsersList } = useContext(globalContext);
  return { user, setUser, usersList, setUsersList };
};
export const useUser = () => {
  const { user, setUser } = useContext(globalContext);
  return { user, setUser };
};
export const useUsersList = () => {
  const { usersList, setUsersList } = useContext(globalContext);
  return { usersList, setUsersList };
};

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

  return (
    <globalContext.Provider value={{ user, setUser, usersList, setUsersList }}>
      {children}
    </globalContext.Provider>
  );
}

export default ContextProvider;
