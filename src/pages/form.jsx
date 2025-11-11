import React, { useState, useEffect } from "react"
import StudentForm from "../components/StudentForm"
import StudentTable from "../components/StudentTable"

function Form() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('students')) || []
        setStudents(savedData)
    }, [])

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students))
    }, [students])

    const addStudent = (student) => {
        setStudents([...students, student])
    }

    const deleteStudent = (id) => {
        const filtered = students.filter((student) => student.id !== id)
        setStudents(filtered)
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Aplikasi Data Siswa</h2>
            <StudentForm onAdd={addStudent} />
            <StudentTable students={students} onDelete={deleteStudent} />
        </div>
    )
}

export default Form

