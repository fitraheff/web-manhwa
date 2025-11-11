import { Routes, Route } from "react-router-dom"

import Home from "../pages/home"
// import About from "../pages/about"
// import Contact from "../pages/contact"
// import Form from "../pages/form"
import DataSiswa from "../pages/table"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/form" element={<Form />} /> */}
            <Route path="/data" element={<DataSiswa />} />
        </Routes>
    )
}

export default AppRoutes