import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";
import DashboardTab from "../components/admin/DashboardTab.jsx";
import OrdersTab from "../components/admin/OrdersTab.jsx";
import UsersTab from "../components/admin/UsersTab.jsx";
import ServicesTab from "../components/admin/ServicesTab.jsx";

export default function AdminPanel() {
  const { user, logoutUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
  };

  if (!user || user.role !== "admin") {
    return <Navigate to="/home" />;
  }

  const username =
    user.username.length > 12
      ? user.username.slice(0, 10) + "..."
      : user.username;

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar bg-light shadow-sm px-4 d-flex justify-content-between align-items-center w-100"
        style={{ borderRadius: "0px" }}
      >
        <span className="navbar-brand fw-bold m-0">HomeAssist Admin Panel</span>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="dropdown-item-text text-muted">{username}</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/home")}
              >
                Switch to User Mode
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-3">
        {/* Page Title */}
        <h2 className="fw-bold mb-3">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>

        {/* Tabs */}
        <ul className="nav nav-underline mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "services" ? "active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              Services
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "services" && <ServicesTab />}
      </div>
    </>
  );
}
