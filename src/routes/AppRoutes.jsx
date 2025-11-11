import { Routes, Route } from "react-router-dom"

import Home from "../pages/home"
import DataSiswa from "../pages/table"
import '../App.css'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<DataSiswa />} />
        </Routes>
    )
}

export default AppRoutes