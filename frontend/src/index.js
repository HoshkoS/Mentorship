import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrap from './Wrap';
import App from './App';
import Registration from './Registration';
import Login from './Login';
import MovieForm from './Movies/form';
import './App.scss';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign_up" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/new_movie" element={<MovieForm />} />
    </Routes>
  </BrowserRouter>
);
