import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
    // 🔹 State untuk data manhwa
    const [manhwa, setManhwa] = useState([]);

    // 🔹 Ambil data dari backend saat komponen pertama kali dimuat
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://pblweb0301.cloud:9000/api/manhwa");
            setManhwa(response.data);
        } catch (error) {
            console.error("Gagal memuat data manhwa:", error);
        }
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
            <div className="container d-flex flex-wrap gap-3 justify-content-center">
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
            </div>
        </div>
    );
};

export default Home;
