import { useAdminStore } from '../../store/useAdminStore.js';
import { useEffect, useState } from 'react';

export default function UsersTab() {
  const { users, loadUsers, updateUser, deleteUser } = useAdminStore();
  const [editUser, setEditUser] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleEdit = (user) => {
    setEditUser(user);
    setUsername(user.username);
    setRole(user.role);
  };

  const handleSave = async () => {
    await updateUser(editUser._id, { username, role });
    setEditUser(null);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setEditUser(null)}></button>
              </div>
              <div className="modal-body">
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-2" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
