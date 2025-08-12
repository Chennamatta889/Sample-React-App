import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Employee Manager</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/add">Add Employee</a>
        <a href="/list">Employee List</a>
      </div>
    </nav>
  );
}

export default Navbar;
