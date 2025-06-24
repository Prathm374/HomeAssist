import { useAdminStore } from '../../store/useAdminStore.js';
import { useEffect, useState } from 'react';

export default function OrdersTab() {
  const {
    orders,
    loadOrders,
    deleteOrder,
    updateOrder,
    services,
    loadServices
  } = useAdminStore();

  const [editingOrder, setEditingOrder] = useState(null);
  const [form, setForm] = useState({
    name: '',
    address: '',
    appointmentDate: '',
    appointmentTime: '',
    paymentMode: '',
    status: '',
    selectedServiceIds: []
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOrders();
    loadServices();
  }, [loadOrders, loadServices]);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setForm({
      name: order.name || '',
      address: order.address || '',
      appointmentDate: order.appointmentDate?.substring(0, 10) || '',
      appointmentTime: order.appointmentTime || '',
      paymentMode: order.paymentMode || 'cash',
      status: order.status || 'In Progress',
      selectedServiceIds: order.services.map(s => s.service._id)
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateOrder(editingOrder._id, form);
    setSaving(false);
    setEditingOrder(null);
    loadOrders();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this order?")) {
      await deleteOrder(id);
      loadOrders();
    }
  };

  const toggleService = (id) => {
    setForm(prev => ({
      ...prev,
      selectedServiceIds: prev.selectedServiceIds.includes(id)
        ? prev.selectedServiceIds.filter(sid => sid !== id)
        : [...prev.selectedServiceIds, id]
    }));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.status}</td>
              <td>${order.totalCost}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(order)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingOrder && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order</h5>
                <button type="button" className="btn-close" onClick={() => setEditingOrder(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Address"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  value={form.appointmentDate}
                  onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                />
                <input
                  type="time"
                  className="form-control mb-2"
                  value={form.appointmentTime}
                  onChange={e => setForm({ ...form, appointmentTime: e.target.value })}
                />

                <select
                  className="form-select mb-2"
                  value={form.paymentMode}
                  onChange={e => setForm({ ...form, paymentMode: e.target.value })}
                >
                  <option value="" disabled>Select Payment Mode</option>
                  <option value="cash">Cash</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>

                <select
                  className="form-select mb-2"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <label className="form-label mt-3">Services</label>
                <div className="form-control" style={{ maxHeight: 150, overflowY: 'auto' }}>
                  {services.map(service => (
                    <div key={service._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={service._id}
                        checked={form.selectedServiceIds.includes(service._id)}
                        onChange={() => toggleService(service._id)}
                      />
                      <label className="form-check-label" htmlFor={service._id}>
                        {service.name} (${service.price})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button className="btn btn-secondary" onClick={() => setEditingOrder(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
