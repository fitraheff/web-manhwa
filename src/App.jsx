import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  )
}

export default App
