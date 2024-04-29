import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
function Navigation() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location);

  const { user } = useContext(NoteContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Jumbo Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <div className="container-fluid mt-2 ms-2 me-5">
                  <span className="navbar-text mt-2">{`Hi  ${user}`}</span>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link $(location.pathname === "/"?"active":"")`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link $(location.pathname === "/about"?"active":"")`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div>
                <Link className="btn btn-outline-dark btn-sm mx-0" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-dark btn-sm mx-3" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-outline-dark btn-sm mx-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
