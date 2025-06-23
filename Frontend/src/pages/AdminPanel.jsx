import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore.js";
import { useUserStore } from "../store/useUserStore.js";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useUserStore();
  const {
    loadStats,
    stats,
    loadUsers,
    users,
    loadOrders,
    orders,
    loadServices,
    services,
  } = useAdminStore();
  const navigate = useNavigate();
  useEffect(() => {
    loadStats();
    loadUsers();
    loadOrders();
    loadServices();
  }, []);

  if (!user || user.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">🛠 Admin Panel</h1>
      <button className="btn btn-primary" onClick={() => navigate("/home")}>
        Switch to User View
      </button>
      {/* 📊 Stats */}
      <section className="mb-5">
        <h3>📈 Dashboard Stats</h3>
        <ul>
          <li>Total Users: {stats?.totalUsers}</li>
          <li>Total Orders: {stats?.totalOrders}</li>
          <li>Total Revenue: ${stats?.totalRevenue}</li>
        </ul>
        <h5 className="mt-3">Top Services:</h5>
        <ul>
          {stats?.topServices?.map((s) => (
            <li key={s.name}>
              {s.name} - {s.count} orders
            </li>
          ))}
        </ul>
      </section>

      {/* 👥 Users */}
      <section className="mb-5">
        <h3>👥 Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.username} ({u.role})
            </li>
          ))}
        </ul>
      </section>

      {/* 📦 Orders */}
      <section className="mb-5">
        <h3>📦 Orders</h3>
        <ul>
          {orders.map((o) => (
            <li key={o._id}>
              {o.name} - {o.totalCost} - {o.status}
            </li>
          ))}
        </ul>
      </section>

      {/* 🛠 Services */}
      <section>
        <h3>🛠 Services</h3>
        <ul>
          {services.map((s) => (
            <li key={s._id}>
              {s.name} - ${s.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
