import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
