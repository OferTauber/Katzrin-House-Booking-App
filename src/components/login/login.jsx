import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useUser, useUsersList } from '../../utils/context';
import { getUsersList, postNewUser } from '../../utils/axios';
import Spinner from '../../utils/spinner';
import LoginForm from './login_form';
import SignInForm from './sing_in_form';
import './login.css';

const Login = () => {
  const { setUser } = useUser();
  const { usersList, setUsersList } = useUsersList();

  useEffect(() => {
    fetchUsers(setUsersList);
  }, [setUsersList]);

  const onUserManualLogin = (email, password) => {
    const listedUser = usersList[0].find((user) => {
      return user.email.toLowerCase() === email.toLowerCase();
    });
    if (listedUser) {
      if (password === listedUser.password) {
        setUser({
          name: listedUser.name_he,
          email: listedUser.email,
          id: listedUser.id + '',
        });
      } else {
        alert('הסיסמה שגויה');
      }
    } else {
      alert('כתובת המייל שהזנת אינה רשומה');
    }
  };

  const onSignIn = async (email, name, password) => {
    const listedUser = usersList[0].find((user) => {
      return user.email === email;
    });
    if (listedUser) {
      alert('כבר קיים חשבון לאימייל הזה');
      return;
    }
    const newUser = {
      email,
      name_he: name,
      name_en: '',
      password,
    };
    await postNewUser(newUser);
    fetchUsers(setUsersList);
  };

  const onSuccessfulGoogleLogin = (credentialResponse) => {
    const userObj = jwt_decode(credentialResponse.credential);

    const listedUser = usersList[0].find((user) => {
      return user.email.toLowerCase() === userObj.email.toLowerCase();
    });

    if (listedUser) {
      setUser({
        name: listedUser.name_he,
        email: userObj.email,
        picture: userObj.picture,
        id: listedUser.id + '',
      });
    } else {
      alert('כתובת המייל שהזנת אינה רשומה');
    }
  };

  if (!usersList) return <Spinner />;

  return (
    <div className="container login-container column">
      <div className="login column">
        <h1>ברוכים הבאים</h1>
        <div className="login-form-box form-box column">
          <h3>התחברות</h3>
          <LoginForm passDataToParent={onUserManualLogin} />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              onSuccessfulGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <div className="signin-form-box form-box column">
          <h3>הרשמה</h3>
          <div className="form-item">
            <SignInForm passDataToParent={onSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const fetchUsers = async (setUsersListCallback) => {
  setUsersListCallback(undefined);
  try {
    const data = await getUsersList();
    setUsersListCallback([data.data]);
  } catch (err) {
    console.log(err);
  }
};
