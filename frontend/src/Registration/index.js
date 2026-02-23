import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import styles from './styles.scss';

const Registration = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    api.post('/sign_up', {
      user: {
        email: email,
        password: pass
      }
    })
      .then((res) =>
        console.log(res.data)
      ).catch(() =>
        setError('Error fetching greeting')
      )
  };

  const handleEmailChange = e => setEmail(e.target.value);

  const handlePasswordChange = e => setPass(e.target.value);

  return (
    <>
      <form onSubmit={handleSignUp}>
        <label>Enter your email:
          <input type="email" onChange={handleEmailChange} />
        </label>
        <label>Enter your pass:
          <input type="password" onChange={handlePasswordChange} />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default Registration;
