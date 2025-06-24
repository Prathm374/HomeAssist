import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";

export default function Navbar() {
  const { user, logoutUser } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <header>
      <nav>
        <div className="hatitle">HomeAssist</div>
        <div className="pagesLink one">
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="logo"></div>
        <div className="pagesLink two">
          <ul>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="dropdown ms-3 hamenu">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <GiHamburgerMenu />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span
                className="dropdown-item-text text-muted fw-bold"
                title={user?.username}
              >
                {user?.username?.length > 12
                  ? `${user.username.slice(0, 10)}…`
                  : user?.username}
              </span>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setShowModal(true)}
              >
                Profile
              </button>
            </li>
            {user?.role === "admin" && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/admin")}
                >
                  Switch to Admin
                </button>
              </li>
            )}
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Login Type:</strong> {user?.loginType || "Local"}
              </p>
              {/* Add more user info here later */}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
