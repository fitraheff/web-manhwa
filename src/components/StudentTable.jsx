import React from "react";

const StudentTable = ({ manhwa, onDelete, onEdit }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Year</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {manhwa.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center text-muted">Tidak ada data</td>
                    </tr>
                ) : (
                    manhwa.map((manhwa, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{manhwa.title}</td>
                            <td>{manhwa.description}</td>
                            <td>{manhwa.year}</td>
                            <td className="">
                                <button className="btn btn-warning btn-sm mx-2"
                                    onClick={() => onEdit(manhwa.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        const isConfirm = window.confirm(
                                            "Apakah Anda yakin ingin menghapus data ini?"
                                        );
                                        if (isConfirm) {
                                            onDelete(manhwa.id);
                                        }
                                    }}>
                                    Hapus
                                </button>
                                {/* <button className="btn btn-warning btn-sm mx-2" 
                                    onClick={() => {
                                            onEdit(student.id_siswa);
                                    }}>
                                    Edit
                                </button> */}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
};

export default StudentTable