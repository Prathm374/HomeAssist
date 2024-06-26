import React from 'react';
import './Navbar.css';
import logo from './Logo.svg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="hatitle">
          HomeAssist
        </div>
        <div className="pagesLink one">
          <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
          </ul>
        </div>
        <div className="logo">
        </div>
        <div className="pagesLink two">
          <ul>
            <li><NavLink to="/service">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
        <div className="hamenu">
          <a href="/">
            <GiHamburgerMenu/>
          </a>
        </div>
      </nav>
      <div className="logo">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>
    </header>
  );
};