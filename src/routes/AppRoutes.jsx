import { Routes, Route } from "react-router-dom"

import Home from "../pages/home"
import Data from "../pages/data"
import '../App.css'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<Data/>} />
        </Routes>
    )
}

export default AppRoutes