import './MainPage.css';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import servicesData from '../services.json';
import Footer from '../components/Footer';
// import React from 'react'
import './ServicesPage.css'

// export default function Mainpage() {
//   return (
//     <div>
//       <div className='navHero' style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Navbar />
//       </div>
//       {/* <div className='featHead'>
//         <h2>comprehensive services tailored to your needs</h2>
//         <div className="feat">
//           {
//             services.map(service => {
//               return (
//                 <Features 
//                 heading={service.heading} 
//                 services={service.services}
//                 key={service.id} 
//                 text={service.text} 
//                 image={service.image} 
//                 />
//               );
//             })
//           }
//         </div>
//       </div> */}
//       <main style={{ flex: 1 }}>
//         <section style={{ padding: '60px 0' }}>
//           <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
//             <h1 style={{ color: '#3A2E7B', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>Our Services</h1>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
//               {servicesData.map((service) => (
//                 <div key={service.id} style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '30px' }}>
//                   <h2 style={{ color: '#3A2E7B', marginBottom: '20px', fontSize: '1.5rem' }}>{service.heading}</h2>
//                   <img src={service.image} alt={service.altText} style={{ width: '64px', height: '64px', marginBottom: '20px' }} />
//                   <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
//                     {service.services.map((item, index) => (
//                       <li key={index} style={{ color: '#333333', marginBottom: '10px' }}>{item}</li>
//                     ))}
//                   </ul>
//                   {service.text.map((paragraph, index) => (
//                     <p key={index} style={{ color: '#333333', marginBottom: '10px' }}>{paragraph}</p>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer/>
//     </div>
//   )
// }

import React, { useState } from 'react';

const OrderCard = ({ order, onEdit, onCancel, onComplete }) => (
  <div className="order-card">
    <div className="order-status">{order.status}</div>
    <h3>Order Details</h3>
    {order.status !== 'Completed' ? (
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
      {order.selectedServices.map((service, index) => (
        <li key={index}>{getServiceName(service.id)} - ${service.cost}</li>
      ))}
    </ul>
    <div className="order-actions">
      {order.status !== 'Completed' && (
        <>
          <button onClick={() => onEdit(order.id)} className="edit-button">Edit</button>
          <button onClick={() => onCancel(order.id)} className="cancel-button">Cancel</button>
        </>
      )}
      {order.status === 'In Progress' && (
        <button onClick={() => onComplete(order.id)} className="complete-button">Mark as Completed</button>
      )}
    </div>
  </div>
);

const getServiceName = (serviceId) => {
  const [categoryId, serviceIndex] = serviceId.split('-');
  const category = servicesData.find(cat => cat.id === parseInt(categoryId));
  return category ? category.services[parseInt(serviceIndex)] : 'Unknown Service';
};

export default function ServicesPage() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

  const handleServiceToggle = (serviceId, cost) => {
    setSelectedServices(prev => 
      prev.some(service => service.id === serviceId)
        ? prev.filter(service => service.id !== serviceId)
        : [...prev, { id: serviceId, cost: cost }]
    );
  };

  const calculateTotalCost = () => {
    return selectedServices.reduce((total, service) => total + service.cost, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name,
      address,
      appointmentDate,
      appointmentTime,
      paymentMode,
      selectedServices,
      totalCost: calculateTotalCost(),
      status: 'In Progress'
    };

    if (editingOrderId) {
      setOrders(orders.map(order => order.id === editingOrderId ? newOrder : order));
      setEditingOrderId(null);
    } else {
      setOrders([...orders, newOrder]);
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedServices([]);
    setAppointmentDate('');
    setAppointmentTime('');
    setName('');
    setAddress('');
    setPaymentMode('');
  };

  const handleEdit = (orderId) => {
    const orderToEdit = orders.find(order => order.id === orderId);
    setSelectedServices(orderToEdit.selectedServices);
    setAppointmentDate(orderToEdit.appointmentDate);
    setAppointmentTime(orderToEdit.appointmentTime);
    setName(orderToEdit.name);
    setAddress(orderToEdit.address);
    setPaymentMode(orderToEdit.paymentMode);
    setEditingOrderId(orderId);
    setShowForm(true);
  };

  const handleCancel = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleComplete = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Completed' } : order
    ));
  };

  const handleAddNewOrder = () => {
    resetForm();
    setEditingOrderId(null);
    setShowForm(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <div className="container">
          <h1 className="services-title">Our Services</h1>
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <div className="services-grid">
                {servicesData.map((category) => (
                  <div key={category.id} className="service-category">
                    <h3>{category.heading}</h3>
                    {category.services.map((service, index) => {
                      const serviceId = `${category.id}-${index}`;
                      const serviceCost = 50 + (index * 10); // Example cost calculation
                      return (
                        <div key={index} className="service-item">
                          <label>
                            <input
                              type="checkbox"
                              className="service-checkbox"
                              checked={selectedServices.some(s => s.id === serviceId)}
                              onChange={() => handleServiceToggle(serviceId, serviceCost)}
                            />
                            {service} - ${serviceCost}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ))}
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
                  required
                />
                <input
                  type="time"
                  className="form-input"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
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
                <h2 className="section-title">Total Cost: ${calculateTotalCost()}</h2>
              </div>
              <button type="submit" className="submit-button">
                {editingOrderId ? 'Update Order' : 'Place Order'}
              </button>
            </form>
          ) : (
            <button onClick={handleAddNewOrder} className="add-order-button">Add New Order</button>
          )}
          <div className="orders-container">
            <h2 className="section-title">Your Orders</h2>
            {orders.filter(order => order.status === 'In Progress').map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onEdit={handleEdit} 
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            ))}
            {orders.filter(order => order.status === 'Completed').map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onEdit={handleEdit} 
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
          