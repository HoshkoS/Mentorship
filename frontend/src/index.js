import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Registration from "./Registration";
import Login from "./Login";
import MovieForm from "./Movies/form";
import Watchlist from "./Watchlists";
import WatchlistPage from "./Watchlists/show";
import WatchlistForm from "./Watchlists/form";
import Navbar from "./Navbar";
import './App.scss';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign_up" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movie" element={<MovieForm />} />
      <Route path="/watch_lists/:id" element={<WatchlistPage />} />
      <Route path="/watch_lists" element={<Watchlist />} />
      <Route path="/watch_list" element={<WatchlistForm />} />
    </Routes>
  </BrowserRouter>);
