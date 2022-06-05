import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useUser } from '../../utils/context';
import { getUsersList } from '../../utils/axios';

const Spinner = () => {
  return <h2>Loading ...</h2>;
};

const Login = () => {
  const { setUser } = useUser();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersList();
        setUsersList([data.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const onSuccessfulGoogleLogin = (credentialResponse) => {
    const userObj = jwt_decode(credentialResponse.credential);

    const listedUser = usersList[0].find(
      (user) => user.email === userObj.email
    );

    if (listedUser) {
      setUser({
        name: userObj.given_name,
        email: userObj.email,
        picture: userObj.picture,
        id: listedUser.id,
      });
    } else {
      alert('כתובת המייל שהזנת אינה רשומה');
    }
  };

  if (!usersList[0]) return <Spinner />;

  return (
    <div className="login">
      <h1>ברוכים הבאים</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccessfulGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
