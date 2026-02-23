import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../utils/axios';
import '../styles/form_styles.scss';
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const navigate = useNavigate();
  const [poster, setPoster] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.string().required("Genre is required"),
    release_date: Yup.date().required("Release date is required"),
    director_id: Yup.number().integer().nullable(),
  });

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("movie[title]", values.title);
    formData.append("movie[description]", values.description);
    formData.append("movie[genre]", values.genre);
    formData.append("movie[release_date]", values.release_date);
    formData.append("movie[director_id]", values.director_id || "");
    if (poster) {
      formData.append("movie[poster]", poster);
    }

    api.post("/movies", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("Movie created:", res.data);
        resetForm();
        setPoster(null);
        navigate('/');
      })
      .catch((error) => {
        console.error("Error creating movie:", error.response?.data || error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Add your movie</h2>
        <Formik
          initialValues={{ title: "", description: "", genre: "", release_date: "", director_id: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
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

              <div className="form-group">
                <label>Release Date:</label>
                <Field type="date" name="release_date" className="input-field" />
                <ErrorMessage name="release_date" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label>Director ID:</label>
                <Field type="number" name="director_id" className="input-field" />
                <ErrorMessage name="director_id" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label>Photo:</label>
                <input type="file" className="input-field" accept="image/*"
                  onChange={(event) => {
                    setPoster(event.target.files[0]);
                    setFieldValue("poster", event.target.files[0]);
                  }}
                />
              </div>

              <button type="submit" className="submit-button">Add Movie</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MovieForm;
