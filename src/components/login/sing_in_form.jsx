import React, { useState } from 'react';

const SignInForm = ({ passDataToParent }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCopy, setPasswordCopy] = useState('');
  const [name, setName] = useState('');
  const [passwordsMatch, serPasswordsMatch] = useState(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password === passwordCopy) {
      passDataToParent(email, name, password);
    } else {
      serPasswordsMatch(false);
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => onFormSubmit(e)}>
      <div className="user-email">
        <label htmlFor="sign-user-email">אימייל:</label>
        <input
          required
          id="sign-user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="user-name">
        <label htmlFor="sign-user-name">שם:</label>
        <input
          required
          id="sign-user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="user-password">
        <label htmlFor="sign-user-password">סיסמה:</label>
        <input
          required
          id="sign-user-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="user-password-copy">
        <label htmlFor="sign-user-password-copy">אימות סיסמה:</label>
        <input
          required
          id="sign-user-password-copy"
          type="password"
          value={passwordCopy}
          onChange={(e) => setPasswordCopy(e.target.value)}
        />
      </div>
      {!passwordsMatch && <p className="error-massege">הסיסמאות אינן תואמות</p>}
      <input type="submit" value="הרשמה" />
    </form>
  );
};

export default SignInForm;
