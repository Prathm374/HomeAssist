import { useEffect, useState, useCallback } from "react";
import "./LoginNav.css";
import logo from "../assets/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginNav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  let hideTimeout;

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
    showNavbar();
  }, []);

  const hideNavbar = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showNavbar = useCallback(() => {
    setIsVisible(true);
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideNavbar, 1000);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(hideTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const isScrolledPast = scrollPosition > window.innerHeight * 0.1;

  const navbarClass = `logNav ${isScrolledPast ? 'opacNav' : ''} ${!isVisible && isScrolledPast ? 'hide' : ''}`;

  return (
    <div className={navbarClass} onMouseEnter={showNavbar}>
      <div className="logNavLogo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <p>HomeAssist</p>
      <div className="navBtns" hidden={!isScrolledPast}>
        <button className="btn text-light glassButton" onClick={handleLogin}>Login</button>
        <button className="btn text-light glassButton" onClick={handleGetStarted}>Sign Up</button>
      </div>
    </div>
  );
}