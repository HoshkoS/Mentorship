import React, { useEffect, useState } from 'react';
import './index.scss';
import api from '../utils/axios';
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = () => {
      api.get("/movies")
        .then((res) =>
          setMovies(res.data)
        )
        .catch((err) =>
          setError("Failed to fetch movies.")
        )
        .finally(() =>
          setLoading(false)
        )
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="movie-list__loading">Loading movies...</p>;
  if (error) return <p className="movie-list__error">{error}</p>;

  return (
    <>
      <h1>Movies list</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2 className="movie-card__title">{movie.title}</h2>
            <p className="movie-card__description">{movie.description}</p>
            <span className="movie-card__genre">{movie.genre}</span>
          </div>
        ))}
      </div>
      <button className="button button--primary" onClick={() => navigate('/new_movie')}>Add Movie</button>
    </>
  );
};

export default MovieList;
