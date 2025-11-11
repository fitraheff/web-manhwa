import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import StudentTable from "../components/StudentTable";
import Modals from "../components/Modals";
import axios from "axios";

const DataSiswa = () => {
    const [manhwa, setManhwa] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("http://pblweb0301.cloud:3000/api/manhwa")
            .then((response) => setManhwa(response.data))
            .catch((error) => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://pblweb0301.cloud:3000/api/manhwa", {
                title: title,
                description: description,
                year: Number(year),
            })
            .then(() => {
                setTitle("");
                setDescription("");
                setYear("");
                fetchData();
                const modal = Modal.getInstance(document.getElementById("addModal"));
                modal.hide();
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://pblweb0301.cloud:3000/api/manhwa/${id}`)
            .then(() => fetchData())
            .catch((error) => console.log(error));
    };

    const handleEdit = (id) => {
        axios
            .get(`http://pblweb0301.cloud:3000/api/manhwa/s/?id=${id}`)
            .then((response) => {
                const data = response.data;
                setEditId(id);
                setTitle(data.title);
                setDescription(data.description);
                setYear(data.year);

                // Tampilkan modal edit
                const editModal = new Modal(document.getElementById("editModal"));
                editModal.show();
            })
            .catch((error) => console.log(error));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://pblweb0301.cloud:3000/api/manhwa/${editId}`, {
                title: title,
                description: description,
                year: Number(year),
            })
            .then(() => {
                alert("Data berhasil diperbarui!");
                fetchData();
                const modal = Modal.getInstance(document.getElementById("editModal"));
                modal.hide();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Aplikasi Data Manhwa</h2>

            {/* Tombol Tambah Siswa */}
            <button
                type="button"
                className="btn btn-primary my-3 col-12"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
            >
                Tambah Manhwa
            </button>

            {/* Tabel Siswa */}
            <StudentTable
                manhwa={manhwa}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            {/* Modal Tambah */}
            <Modals
                id="addModal"
                title="Tambah Data Manhwa"
                onSubmit={handleSubmit}
                submitText="Simpan"
            >
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Title</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <label>Year</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Description</label>
                </div>
            </Modals>

            {/* Modal Edit */}
            <Modals
                id="editModal"
                title="Edit Data Manhwa"
                onSubmit={handleUpdate}
                submitText="Simpan Perubahan"
            >
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Nama</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <label>Year</label>
                </div>

                <div className="form-floating">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Description</label>
                </div>
            </Modals>
        </div>
    );
};

export default DataSiswa;
