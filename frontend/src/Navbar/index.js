import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sign_up" className="nav-link">Sign Up</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/movie" className="nav-link">New Movie</Link>
        <Link to="/watch_lists" className="nav-link">Movie Lists</Link>
      </div>
    </nav>
  );
};

export default Navbar;
