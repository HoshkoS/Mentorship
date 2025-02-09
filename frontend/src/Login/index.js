import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import api from '../utils/axios';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    api.post('/google_oauth2', {
      token: credentialResponse.credential
    }).then(res => {
      console.log('Login successful:', res);
      navigate('/');
    }).catch(e =>
      console.error('Login failed:', e)
    )
  }
  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();

    api.post('/login', {
      user: {
        email: email,
        password: pass
      }
    })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      }).catch(() =>
        setError('Error fetching greeting')
      )
  };

  const handleEmailChange = e => setEmail(e.target.value);

  const handlePasswordChange = e => setPass(e.target.value);

  return (
    <GoogleOAuthProvider>
      <form onSubmit={handleSignIn}>
        <label>Enter your email:
          <input type="email" onChange={handleEmailChange} />
        </label>
        <label>Enter your pass:
          <input type="password" onChange={handlePasswordChange} />
        </label>
        <button type="submit">Log in</button>
      </form>
      <GoogleLoginButton />
    </GoogleOAuthProvider>
  );
};

export default Login;
