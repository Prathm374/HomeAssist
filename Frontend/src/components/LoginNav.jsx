import React from "react";
import "./LoginNav.css";
import logo from "../assets/Logo.svg";
import { NavLink } from "react-router-dom";

export default function LoginNav() {
  return (
    <div className="logNav">
      <div className="logNavLogo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <p>HomeAssist</p>
    </div>
  );
}
