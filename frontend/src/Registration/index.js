import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import './styles.scss';

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignUp = (values, { setSubmitting, setErrors }) => {
    api.post('/sign_up', { user: values })
      .then((res) => navigate('/'))
      .catch(() => setErrors({ submit: 'Error signing up' }))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Sign Up</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
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
      </div>
    </div>
  );
};

export default Registration;
