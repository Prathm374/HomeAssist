import { useAdminStore } from "../../store/useAdminStore.js";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardTab() {
  const { stats, loadStats } = useAdminStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="alert alert-danger text-center my-5">
        Failed to load stats. Please try again later.
      </div>
    );
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fillMonthlyData = (rawData = []) => {
    const filled = new Array(12)
      .fill(0)
      .map((_, i) => ({ _id: i + 1, count: 0, total: 0 }));
    rawData.forEach(({ _id, count, total }) => {
      filled[_id - 1] = {
        _id,
        count: count ?? 0,
        total: total ?? 0,
      };
    });
    return filled;
  };

  const usersPerMonth = fillMonthlyData(stats?.usersPerMonth);
  const ordersPerMonth = fillMonthlyData(stats?.ordersPerMonth);
  const revenuePerMonth = fillMonthlyData(stats?.revenueByMonth);
  const topServices = stats?.topServices || [];
  const topService = topServices?.[0]?.name || "N/A";

  const ordersOverTimeData = {
    labels: ordersPerMonth.map((o) => months[o._id - 1]),
    datasets: [
      {
        label: "Orders",
        data: ordersPerMonth.map((o) => o.count),
        fill: false,
        borderColor: "#007bff",
        tension: 0.4,
      },
    ],
  };

  const newUsersData = {
    labels: usersPerMonth.map((u) => months[u._id - 1]),
    datasets: [
      {
        label: "New Users",
        data: usersPerMonth.map((u) => u.count),
        backgroundColor: "#28a745",
      },
    ],
  };
  const revenueByMonthData = {
    labels: revenuePerMonth.map((r) => months[r._id - 1]),
    datasets: [
      {
        label: "Revenue",
        data: revenuePerMonth.map((r) => r.total),
        fill: false,
        borderColor: "#ffc107",
        backgroundColor: "#ffc107",
        tension: 0.4,
      },
    ],
  };

  const topServicesData = {
    labels: topServices.map((s) => s.name),
    datasets: [
      {
        label: "Bookings",
        data: topServices.map((s) => s.count),
        backgroundColor: "#17a2b8",
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-4 g-3 mb-4">
        <div className="col">
          <div className="card text-center p-3 h-100 shadow-sm d-flex flex-column justify-content-center">
            <h6 className="text-muted mb-1">Total Orders</h6>
            <h3 className="fw-bold">{stats.totalOrders}</h3>
            <span
              className={
                stats.orderGrowth >= 0 ? "text-success" : "text-danger"
              }
            >
              {stats.orderGrowth >= 0 ? "+" : ""}
              {Math.abs(stats.orderGrowth)}%{" "}
              {stats.orderGrowth >= 0 ? "↑" : "↓"}
            </span>
          </div>
        </div>
        <div className="col">
          <div className="card text-center p-3 h-100 shadow-sm d-flex flex-column justify-content-center">
            <h6 className="text-muted mb-1">Total Users</h6>
            <h3 className="fw-bold">{stats.totalUsers}</h3>
            <span
              className={stats.userGrowth >= 0 ? "text-success" : "text-danger"}
            >
              {stats.userGrowth >= 0 ? "+" : ""}
              {Math.abs(stats.userGrowth)}% {stats.userGrowth >= 0 ? "↑" : "↓"}
            </span>
          </div>
        </div>
        <div className="col">
          <div className="card text-center p-3 h-100 shadow-sm d-flex flex-column justify-content-center">
            <h6 className="text-muted mb-1">Most Booked Service</h6>
            <h5 className="fw-bold">{topService}</h5>
            <span className="text-muted">
              ({stats.topService?.count ?? 0} orders)
            </span>
          </div>
        </div>
        <div className="col">
          <div className="card text-center p-3 h-100 shadow-sm d-flex flex-column justify-content-center">
            <h6 className="text-muted mb-1">Total Revenue</h6>
            <h3 className="fw-bold">{stats.totalRevenue}</h3>
            <span
              className={
                stats.revenueGrowth >= 0 ? "text-success" : "text-danger"
              }
            >
              {stats.revenueGrowth >= 0 ? "+" : ""}
              {Math.abs(stats.revenueGrowth)}%{" "}
              {stats.revenueGrowth >= 0 ? "↑" : "↓"}
            </span>
          </div>
        </div>
      </div>
      <h5 className="mb-3">Key Metrics</h5>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Orders Over Time</h6>
            <Line data={ordersOverTimeData} />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">New Users by Month</h6>
            <Bar data={newUsersData} />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Top Services Booked</h6>
            <Bar
              data={topServicesData}
              options={{
                indexAxis: "y",
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Revenue by Month</h6>
            <Line data={revenueByMonthData} />
          </div>
        </div>
      </div>
    </div>
  );
}
