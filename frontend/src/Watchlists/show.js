import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { useParams } from "react-router-dom";
import "./index.scss";

const WatchlistPage = () => {
  const { id } = useParams();
  const [watchlist, setWatchlist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`/watchlists/${id}`)
      .then((res) => setWatchlist(res.data))
      .catch((error) => console.error("Error fetching watchlist:", error));
  }, [id]);

  const fetchMovies = () => {
    api.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((error) => console.error("Error fetching movies:", error));
  };

  return (
    <div className="watchlist-page">
      <h1>{watchlist ? watchlist.title : 'Loading...'}</h1>
      <div className="movie-list">
        {watchlist && watchlist.movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h4>{movie.title}</h4>
            <p>{movie.genre}</p>
            {movie.poster && <img src={URL.createObjectURL(movie.poster)} alt={movie.title} />}
          </div>
        ))}
      </div>
      <button className="add-movie-btn" onClick={() => { fetchMovies(); setShowModal(true); }}>
        Add Movie to Watchlist
      </button>
    </div>
  );
};

export default WatchlistPage;
