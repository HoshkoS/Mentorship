import React, { useState, useEffect } from 'react';
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const WatchlistDisplay = () => {
  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    api.get("/watchlists")
      .then((res) => setWatchlists(res.data))
      .catch((error) => console.error("Error fetching watchlists:", error));
  }, []);

  return (
    <div className="watchlist-container">
      <h2 className="card-title">Watchlists</h2>
      <div className="watchlist">
        {watchlists.map((watchlist) => (
          <div key={watchlist.id} className="watchlist-item">
            <span>{watchlist.title}</span>
            <span className={`status ${watchlist.watched ? "watched" : "not-watched"}`}>
              {watchlist.watched ? "Watched" : "Not Watched"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistDisplay;
