import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Modals from "../components/Modals";
import { Modal } from "bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import api from "../utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    // 🔹 State untuk data manhwa
    const [manhwa, setManhwa] = useState([]);

    const [bookmarks, setBookmarks] = useState([]); // bookmark user
    const [selectedManhwa, setSelectedManhwa] = useState(null);
    const [chapter, setChapter] = useState("");

    // 🔹 Ambil data dari backend saat komponen pertama kali dimuat
    useEffect(() => {
        fetchData();
        fetchBookmarks();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/manhwa`);
            setManhwa(response.data);
        } catch (error) {
            console.error("Gagal memuat data manhwa:", error);
        }
    };

    const fetchBookmarks = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/api/bookmarks`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setBookmarks(res.data.data || []);
    };

    // ➤ Cek apakah manhwa sudah di-bookmark
    const isBookmarked = (manhwaId) => {
        return bookmarks.some((b) => b.manhwa.id === manhwaId);
    };

    // ➤ Klik card → buka modal
    const handleOpenModal = (item) => {
        setSelectedManhwa(item);
        setChapter("");

        // buka modal bootstrap
        const modalEl = document.getElementById("bookmarkModal");
        const modal = new Modal(modalEl);
        modal.show();
    };


    // ➤ Submit bookmark
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        await axios.post(
            `${API_URL}/api/bookmarks`,
            {
                manhwaId: selectedManhwa.id,
                chapter: Number(chapter),
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        // Reload bookmark agar icon berubah
        await fetchBookmarks();

        const modalEl = document.getElementById("bookmarkModal");
        const modal = Modal.getInstance(modalEl);
        modal.hide();

    };

    return (
        <div className="container p-3">
            {/* Header */}
            <div className="jumbotron jumbotron-fluid bg-light p-4 rounded">
                <div className="container">
                    <h1 className="display-5 fw-bold">Manhwa List</h1>
                    <p className="lead">
                        Ini adalah project website manhwa sederhana menggunakan React, Express, dan Prisma.
                        Data akan tampil otomatis dari API backend.
                    </p>
                </div>
            </div>

            {/* List Card */}
            {/* <div className="container d-flex flex-wrap gap-3 justify-content-center">
                {manhwa.length === 0 ? (
                    <p>Loading data manhwa...</p>
                ) : (
                    manhwa.map((item) => (
                        <Card
                            key={item.id}
                            image={item.coverImage || "https://via.placeholder.com/150"}
                            title={item.title}
                        >
                            {item.desc || "Tidak ada deskripsi"}
                        </Card>
                    ))
                )}
            </div> */}

            <div className="container d-flex flex-wrap gap-3 justify-content-center">
                {manhwa.map((item) => (
                    <Card
                        key={item.id}
                        image={item.coverImage}
                        title={item.title}
                        isBookmarked={isBookmarked(item.id)}
                        onClick={() => handleOpenModal(item)}
                    >
                        {item.desc}
                    </Card>
                ))}
            </div>

            {/* MODAL INPUT CHAPTER */}
            {selectedManhwa && (
                <Modals
                    id="bookmarkModal"
                    title={`Bookmark ${selectedManhwa.title}`}
                    btnText="Save Bookmark"
                    onSubmit={handleSubmit}
                    // show={showModal}
                    // setShow={setShowModal}
                >
                    <div className="mb-3">
                        <label className="form-label">Chapter</label>
                        <input
                            type="number"
                            className="form-control"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            required
                        />
                    </div>
                </Modals>
            )}
        </div>
    );
};

export default Home;
