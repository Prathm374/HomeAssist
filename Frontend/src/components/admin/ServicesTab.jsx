import { useAdminStore } from "../../store/useAdminStore.js";
import { useEffect, useState } from "react";

export default function ServicesTab() {
  const { services, loadServices, updateService, deleteService } =
    useAdminStore();
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleEdit = (service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const handleSave = async () => {
    await updateService(editingService._id, form);
    setEditingService(null);
    loadServices();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      await deleteService(id);
      loadServices();
    }
  };

  return (
    <div className="row">
      {services.map((service) => (
        <div className="col-md-4 mb-3" key={service._id}>
          <div
            className="card h-100 shadow-sm"
            style={{
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text flex-grow-1">{service.description}</p>
              <p>
                <strong>${service.price}</strong>
              </p>
              <div className="mt-auto">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {editingService && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Service</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingService(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
