import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import api from "../utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

const BookmarkPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [chapter, setChapter] = useState("");

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const res = await api.get(`${API_URL}/api/bookmarks`);
            setBookmarks(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`${API_URL}/api/bookmarks/${id}`);
            fetchBookmarks();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (bookmark) => {
        setEditId(bookmark.id);
        setChapter(bookmark.chapter || "");

        const modalEl = document.getElementById("editBookmarkModal");
        const modal = new Modal(modalEl);
        modal.show();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`${API_URL}/api/bookmarks/${editId}`, {
                chapter: Number(chapter),
            });

            fetchBookmarks();

            const modalEl = document.getElementById("editBookmarkModal");
            const modal = Modal.getInstance(modalEl);
            modal.hide();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Bookmark Saya</h2>

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Chapter</th>
                        <th>Updated</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Tidak ada bookmark
                            </td>
                        </tr>
                    ) : (
                        bookmarks.map((b) => (
                            <tr key={b.id}>
                                <td>
                                    <img
                                        src={b.manhwa.coverImage}
                                        alt={b.manhwa.title}
                                        style={{ width: "80px", borderRadius: "6px" }}
                                    />
                                </td>
                                <td>{b.manhwa.title}</td>
                                <td>{b.chapter}</td>
                                <td>{new Date(b.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(b)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(b.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* MODAL EDIT BOOKMARK */}
            <div
                className="modal fade"
                id="editBookmarkModal"
                tabIndex="-1"
                aria-labelledby="editBookmarkLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editBookmarkLabel">
                                Edit Chapter
                            </h1>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Chapter"
                                        value={chapter}
                                        onChange={(e) => setChapter(e.target.value)}
                                        required
                                    />
                                    <label>Chapter</label>
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookmarkPage;
