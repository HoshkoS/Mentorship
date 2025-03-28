import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const WatchlistForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    watched: Yup.boolean().required("Watched status is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    api.post("/watchlists", values)
      .then((res) => {
        console.log("Watchlist created:", res.data);
        resetForm();
        navigate("/watch_lists");
      })
      .catch((error) => {
        console.error("Error creating watchlist:", error.response?.data || error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Create Watchlist</h2>
        <Formik
          initialValues={{ title: "", watched: false, user_id: 1 }}
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
              <label>
                <Field type="checkbox" name="watched" className="checkbox" /> Watched
              </label>
              <ErrorMessage name="watched" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button">Add Watchlist</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default WatchlistForm;
