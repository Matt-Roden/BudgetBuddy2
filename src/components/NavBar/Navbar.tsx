import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="navitem">
        <Link to="/">Home</Link>
      </div>
      <div className="navitem">
        <Link to="/budgets">My Budgets</Link>
      </div>
    </div>
  );
};

export default Navbar;
