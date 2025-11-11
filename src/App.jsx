import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Routerrrr } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
// import React, { useState, useEffect } from "react"
// import StudentForm from "./components/StudentForm"
// import StudentTable from "./components/StudentTable"
// import Form from "./pages/form"



function App() {
  return (
    <Routerrrr>
      <Navbar />
      <AppRoutes />
      {/* <Form /> */}
    </Routerrrr>
  )
}

export default App
