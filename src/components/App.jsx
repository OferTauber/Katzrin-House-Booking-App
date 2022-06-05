// import axios from 'axios';
import React from 'react';
import Login from './login/login';
import { useGlobalContext } from '../utils/context';
import Main from './main/main/main';
// import getUsersList from '../utils/axios';

function App() {
  const { user } = useGlobalContext();
  console.log(user);

  if (!user.id) return <Login />;

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
