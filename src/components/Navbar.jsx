import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 navbar-animated">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    <img src="../../public/vite.svg" alt="" />
                    <span className="ms-2 fw-bold">Kelompok1</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/data">Data Manhwa</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar   