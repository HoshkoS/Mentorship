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
    <Formik
      initialValues={{ title: "", description: "", genre: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>Title:</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className="error" />
        </div>
        <div>
          <label>Description:</label>
          <Field as="textarea" name="description" />
          <ErrorMessage name="description" component="div" className="error" />
        </div>
        <div>
          <label>Genre:</label>
          <Field type="text" name="genre" />
          <ErrorMessage name="genre" component="div" className="error" />
        </div>
        <button type="submit">Add Movie</button>
      </Form>
    </Formik>
  );
};

export default MovieForm;
