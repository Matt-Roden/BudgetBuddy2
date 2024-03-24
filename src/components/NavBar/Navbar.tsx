import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/create-budget">Create Budget</Link>
      <Link to="/budgets">My Budgets</Link>
    </div>
  );
};

export default Navbar;
