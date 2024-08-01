import React from "react";
import "./Footer.css";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div id="footlogo">&copy; 2024 | HomeAssist | All Rights Reserved</div>

      <div>
        <NavLink to="/about">About Us</NavLink>
      </div>
      <div>
      <NavLink to="/service">Services</NavLink>
      </div>
      <div>
      <NavLink to="/contact">Contact</NavLink>
      </div>
      <div className="connectUs">
        <a href="https://www.instagram.com/prathmesh_374/" target="_blank">
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/prathmesh-g-047107275/"
          target="_blank"
        >
          <FaLinkedinIn />
        </a>
        <a href="https://wa.me/+919422125531" target="_blank">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}
