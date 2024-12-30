import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import styles from './styles.scss';

const Login = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleSignUp = () => {
    api.post('/sign_up', {
      user: {
        email: email,
        password: pass
      }
    })
      .then((res) =>
        setMessage(res.data)
      ).catch(() =>
        setError('Error fetching greeting')
      )
  };

  const handleEmailChange = e => setEmail(e.target.value);

  const handlePasswordChange = e => setPass(e.target.value);

  return (
    <>
      <div>{message}</div>
      <form onSubmit={handleSignUp}>
        <label>Enter your email:
          <input type="email" onChange={handleEmailChange} />
        </label>
        <label>Enter your pass:
          <input type="password" onChange={handlePasswordChange} />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
