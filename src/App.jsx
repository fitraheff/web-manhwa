import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Routerrrr } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Routerrrr>
      <Navbar />
      <AppRoutes />
    </Routerrrr>
  )
}

export default App
