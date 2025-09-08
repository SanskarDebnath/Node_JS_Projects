import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// Import your icon - replace with your actual image path
import iconImage from "../assets/BharatEMail.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={iconImage} alt="BharatMail Logo" className="brand-icon" />
          <span className="brand-text">BharatEmail</span>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? "nav-active" : ""}`}>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>Home</li>
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/Features"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>Features</li>
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/Pricing"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>Pricing</li>
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/About"
            onClick={() => setIsMenuOpen(false)}
          >
            <li>About</li>
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/Login"
            onClick={() => setIsMenuOpen(false)}
          >
            <li className="login-button">Login</li>
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            to="/Signup"
            onClick={() => setIsMenuOpen(false)}
          >
            <li className="signup-button">Sign Up</li>
          </NavLink>
        </div>
        
        <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;