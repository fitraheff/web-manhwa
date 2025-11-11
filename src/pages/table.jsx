import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import StudentTable from "../components/StudentTable";
import Modals from "../components/Modals";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DataSiswa = () => {
    const [manhwa, setManhwa] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverImage, setCover] = useState("");
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm.trim() === "") {
                fetchData();
            } else {
                axios
                    .get(`http://pblweb0301.cloud:9000/api/manhwa/s?title=${searchTerm}`)
                    .then((res) => setManhwa(res.data))
                    .catch((err) => console.log(err));
            }
        }, 500); // delay 0.5 detik

        return () => clearTimeout(delay);
    }, [searchTerm]);

    const fetchData = () => {
        axios
            .get("http://pblweb0301.cloud:9000/api/manhwa")
            .then((response) => setManhwa(response.data))
            .catch((error) => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://pblweb0301.cloud:9000/api/manhwa", {
                title: title,
                desc: desc,
                coverImage: coverImage,
            })
            .then(() => {
                setTitle("");
                setDesc("");
                setCover("");
                fetchData();
                const modal = Modal.getInstance(document.getElementById("addModal"));
                modal.hide();
            })
            .catch((error) => console.log(error.response.data || error));
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://pblweb0301.cloud:9000/api/manhwa/${id}`)
            .then(() => fetchData())
            .catch((error) => console.log(error));
    };

    const handleEdit = (id) => {
        axios
            .get(`http://pblweb0301.cloud:9000/api/manhwa/s/?id=${id}`)
            .then((response) => {
                const data = response.data;
                setEditId(id);
                setTitle(data.title);
                setDesc(data.desc);
                setCover(data.coverImage);

                // Tampilkan modal edit
                const editModal = new Modal(document.getElementById("editModal"));
                editModal.show();
            })
            .catch((error) => console.log(error));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://pblweb0301.cloud:9000/api/manhwa/${editId}`, {
                title: title,
                desc: desc,
                coverImage: coverImage,
            })
            .then(() => {
                fetchData();
                const modal = Modal.getInstance(document.getElementById("editModal"));
                modal.hide();

                toast.success("Data berhasil diperbarui!", { position: "top-center", autoClose: 3000 });

            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Form Data Manhwa</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Cari manhwa berdasarkan title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
                btnText="Simpan"
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
                    <textarea
                        className="form-control"
                        placeholder="coverImage"
                        value={coverImage}
                        onChange={(e) => setCover(e.target.value)}
                        required
                    />
                    <label>Cover Image</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
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
                btnText="Simpan Perubahan"
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
                        type="text"
                        className="form-control"
                        placeholder="coverImage"
                        value={coverImage}
                        onChange={(e) => setCover(e.target.value)}
                        required
                    />
                    <label>Cover Image</label>
                </div>

                <div className="form-floating">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                    <label>Description</label>
                </div>
            </Modals>
            <ToastContainer />
        </div>
    );
};

export default DataSiswa;
