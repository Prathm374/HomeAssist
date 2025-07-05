import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useUserStore } from "../store/useUserStore.js";
import { useOrderStore } from "../store/useOrderStore.js";
import { useServiceStore } from "../store/useServiceStore.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ServicesPage.css";

const OrderCard = ({ order, onEdit, onCancel, onComplete }) => (
  <div className="order-card">
    <div className="order-status">{order.status}</div>
    <h3>Order Details</h3>
    {order.status === "In Progress" ? (
      <>
        <p>Name: {order.name}</p>
        <p>Address: {order.address}</p>
        <p>Date: {order.appointmentDate}</p>
        <p>Time: {order.appointmentTime}</p>
        <p>Payment Mode: {order.paymentMode}</p>
      </>
    ) : (
      <p>Completed on: {order.appointmentDate}</p>
    )}
    <p>Total Cost: ${order.totalCost}</p>
    <h4>Services:</h4>
    <ul>
      {order.services.map((s, i) => (
        <li key={i}>
          {s.service.name} - ${s.cost}
        </li>
      ))}
    </ul>
    <div className="order-actions">
      {order.status === "In Progress" && (
        <>
          <button onClick={() => onEdit(order._id)} className="edit-button">
            Edit
          </button>
          <button onClick={() => onCancel(order._id)} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={() => onComplete(order._id)}
            className="complete-button"
          >
            Mark as Completed
          </button>
        </>
      )}
    </div>
  </div>
);

export default function ServicesPage() {
  const { user } = useUserStore();
  const {
    orders,
    fetchOrders,
    placeOrder,
    editOrder,
    cancelOrder,
    completeOrder,
  } = useOrderStore();
  const { services, fetchServices } = useServiceStore();
  useEffect(() => {
    fetchOrders();
    fetchServices();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);

    setAppointmentDate(dateStr);
    setAppointmentTime(timeStr);
  }, [user, fetchOrders]);
  const [showForm, setShowForm] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const handleServiceToggle = (serviceId, cost) => {
    setSelectedServices((prev) =>
      prev.some((service) => service.id === serviceId)
        ? prev.filter((service) => service.id !== serviceId)
        : [...prev, { id: serviceId, cost }]
    );
  };

  const calculateTotalCost = () => {
    return selectedServices.reduce((total, service) => total + service.cost, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceIds = selectedServices.map((service) => service.id);
      const orderPayload = {
        name,
        address,
        appointmentDate,
        appointmentTime,
        paymentMode,
        selectedServiceIds: serviceIds,
      };
      if (editingOrderId) {
        const { success, message } = await editOrder(editingOrderId, orderPayload, user._id);
        if (success) {
          toast.success(message || "Order updated successfully");
          setShowForm(false);
          setEditingOrderId(null);
          resetForm();
        } else {
          toast.error(message || "Order update failed");
        }
        
      } else {
        const { success, message } = await placeOrder(orderPayload, user._id);
        if (success) {
          toast.success(message || "Order placed successfully");
          setShowForm(false);
          resetForm();
        } else {
          toast.error(message || "Order placement failed");
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const resetForm = () => {
    setSelectedServices([]);
    setAppointmentDate(new Date().toISOString().slice(0, 10));
    setAppointmentTime(new Date().toTimeString().slice(0, 5));
    // setName("");
    // setAddress("");
    setPaymentMode("");
  };

  const handleEdit = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedServices(
      order.services.map((s) => ({
        id: s.service._id,
        cost: s.cost,
      }))
    );
    setName(order.name);
    setAddress(order.address);
    setAppointmentDate(order.appointmentDate.slice(0, 10));
    setAppointmentTime(order.appointmentTime);
    setPaymentMode(order.paymentMode);
    setEditingOrderId(orderId);
    setShowForm(true);
  };

  const handleCancel = async (orderId) => {
    const { success, message } = await cancelOrder(orderId, user._id);
    if (success) {
      toast.success(message || "Order cancelled successfully");
    } else {
      toast.error(message || "Order cancellation failed");
    }
  };

  const handleComplete = async (orderId) => {
    const { success, message } = await completeOrder(orderId, user._id);
    if (success) {
      toast.success(message || "Order completed successfully");
    } else {
      toast.error(message || "Order completion failed");
    }
  };

  const handleAddNewOrder = () => {
    resetForm();
    setEditingOrderId(null);
    setShowForm(true);
  };

  return (
    <>
      <div className="page-wrapper navhero">
        <Navbar />
        <main>
          <div className="container">
            <h1 className="services-title">Our Services</h1>
            {showForm ? (
              <form onSubmit={handleSubmit}>
                <div className="services-grid">
                  {[...new Set(services.map((s) => s.categoryName))].map(
                    (catName) => (
                      <div key={catName} className="service-category">
                        <h3>{catName}</h3>
                        {services
                          .filter((s) => s.categoryName === catName)
                          .map((service) => (
                            <div key={service._id} className="service-item">
                              <label>
                                <input
                                  type="checkbox"
                                  className="service-checkbox"
                                  checked={selectedServices.some(
                                    (s) => s.id === service._id
                                  )}
                                  onChange={() =>
                                    handleServiceToggle(
                                      service._id,
                                      service.price
                                    )
                                  }
                                />
                                {service.name} - ${service.price}
                              </label>
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </div>
                <div className="form-group">
                  <h2 className="section-title">Personal Information</h2>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <h2 className="section-title">Appointment Details</h2>
                  <input
                    type="date"
                    className="form-input"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 10)}
                    required
                  />
                  <input
                    type="time"
                    className="form-input"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    min="08:00"
                    max="20:00"
                    required
                  />
                </div>
                <div className="form-group">
                  <h2 className="section-title">Payment Mode</h2>
                  <select
                    className="form-input"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    required
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
                <div className="total-cost">
                  <h2 className="section-title">
                    Total Cost: ${calculateTotalCost()}
                  </h2>
                </div>
                <button type="submit" className="submit-button">
                  {editingOrderId ? "Update Order" : "Place Order"}
                </button>
              </form>
            ) : (
              <button onClick={handleAddNewOrder} className="add-order-button">
                Add New Order
              </button>
            )}
            <div className="orders-container">
              <h2 className="section-title">Your Orders</h2>
              {orders
                .filter((o) => o.status === "In Progress")
                .map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onComplete={handleComplete}
                  />
                ))}
              {orders
                .filter((order) => order.status !== "In Progress")
                .map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onComplete={handleComplete}
                  />
                ))}
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
