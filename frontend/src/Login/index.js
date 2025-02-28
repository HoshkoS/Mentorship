import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
    <div className="google-button">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = (values, { resetForm }) => {
    api.post('/login', {
      user: {
        ...values
      }
    })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      }).catch(() =>
        setError('Error fetching greeting')
      )
  };

  return (
    <GoogleOAuthProvider>
      <div className="container">
        <div className="card">
          <h2 className="card-title">Sign In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ isSubmitting, errors }) => (
              <Form className="form">
                <div className="form-group">
                  <label>Email:</label>
                  <Field type="email" name="email" className="input-field" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <Field type="password" name="password" className="input-field" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                {errors.submit && <div className="error-message">{errors.submit}</div>}
                <button type="submit" disabled={isSubmitting} className="submit-button">
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <GoogleLoginButton />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
