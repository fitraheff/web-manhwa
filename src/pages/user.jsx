import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { Modal } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const DataUser = () => {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [currentRole, setCurrentRole] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get(`${API_URL}/api/users`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    };

    const handleEdit = (user) => {
        setEditId(user.id);
        setCurrentRole(user.role);

        const modal = new Modal(document.getElementById("editUserRole"));
        modal.show();
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        api.put(`${API_URL}/api/users/role/${editId}`, { role: currentRole })
            .then(() => {
                toast.success("Role updated successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                });

                fetchUsers();

                const modal = Modal.getInstance(document.getElementById("editUserRole"));
                modal.hide();
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Failed to update", {
                    position: "top-center",
                });
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Management</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    Tidak ada data user
                                </td>
                            </tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user.id}>
                                    <td>{idx + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit Role
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Update Role */}
            <div
                className="modal fade"
                id="editUserRole"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleUpdate}>
                            <div className="modal-header">
                                <h5 className="modal-title">Update User Role</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={currentRole}
                                    onChange={(e) => setCurrentRole(e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default DataUser;
