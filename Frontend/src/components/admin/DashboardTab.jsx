import { useAdminStore } from '../../store/useAdminStore.js';
import { useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

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

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (!stats) return <p>Loading...</p>;

  const totalOrders = stats.totalOrders || 0;
  const totalUsers = stats.totalUsers || 0;
  const topService = stats.topServices?.[0]?.name || 'N/A';
  const topServices = stats.topServices || [];

  // Dummy data - replace with real stats from backend when extended
  const ordersOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Orders',
      data: [120, 140, 110, 180, 90, 150],
      fill: false,
      borderColor: '#007bff',
      tension: 0.4
    }]
  };

  const newUsersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Users',
      data: [30, 20, 25, 40, 15, 35],
      backgroundColor: '#28a745'
    }]
  };

  const topServicesData = {
    labels: topServices.map(s => s.name),
    datasets: [{
      label: 'Bookings',
      data: topServices.map(s => s.count),
      backgroundColor: '#17a2b8'
    }]
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h6>Total Orders</h6>
            <h3>{totalOrders}</h3>
            <span className="text-success">+15%</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h6>New Users</h6>
            <h3>{totalUsers}</h3>
            <span className="text-success">+10%</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h6>Most Booked Service</h6>
            <h3>{topService}</h3>
            <span className="text-success">+5%</span>
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
            <Bar data={topServicesData} options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
