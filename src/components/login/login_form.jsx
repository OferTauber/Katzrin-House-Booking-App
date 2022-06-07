import React, { useState } from 'react';

const LoginForm = ({ passDataToParent }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    passDataToParent(email, password);
  };

  return (
    <form className="login-form" onSubmit={(e) => onFormSubmit(e)}>
      <div className="user-email">
        <label htmlFor="user-email">אימייל:</label>
        <input
          required
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="user-password">
        <label htmlFor="user-password">סיסמה:</label>
        <input
          required
          id="user-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="כניסה" />
    </form>
  );
};

export default LoginForm;
