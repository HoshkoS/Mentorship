import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../utils/axios';

const MovieForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.string().required("Genre is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    api.post("/movies", values)
      .then((res) => {
        console.log("Movie created:", res.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating movie:", error.response?.data || error);
      })
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Add your movie</h2>
        <Formik
          initialValues={{ title: "", description: "", genre: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div className="form-group">
              <label>Title:</label>
              <Field type="text" name="title" className="input-field" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <Field as="textarea" name="description" className="input-field" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <Field type="text" name="genre" className="input-field" />
              <ErrorMessage name="genre" component="div" className="error-message" />
            </div>
            <button type="submit" className="submit-button">Add Movie</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default MovieForm;
