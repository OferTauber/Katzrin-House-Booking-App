import { createContext, useState, useContext } from 'react';

export const globalContext = createContext();

export const useGlobalContext = () => {
  const { user, setUser } = useContext(globalContext);
  return { user, setUser };
};
export const useUser = () => {
  const { user, setUser } = useContext(globalContext);
  return { user, setUser };
};

function ContextProvider({ children }) {
  const [user, setUser] = useState({
    name: undefined,
    email: undefined,
    picture: undefined,
  });

  return (
    <globalContext.Provider value={{ user, setUser }}>
      {children}
    </globalContext.Provider>
  );
}

export default ContextProvider;
