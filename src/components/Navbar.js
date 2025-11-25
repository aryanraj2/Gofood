import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 fw-bold" to="/">MY APP</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="ms-auto">
                            {(!localStorage.getItem("token")) ?
                                <div className="d-flex gap-2">
                                    <Link
                                        className="btn fw-bold"
                                        style={{ backgroundColor: "#ffffff", color: "#14532d", borderRadius: "6px" }}
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        className="btn fw-bold ms-2"
                                        style={{ backgroundColor: "#ffffff", color: "#14532d", borderRadius: "6px" }}
                                        to="/signup"
                                    >
                                        Sign Up
                                    </Link>

                                </div> :
                                <button
                                    onClick={handleLogout}
                                    className="btn fw-bold"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        color: "#14532d",
                                        borderRadius: "6px"
                                    }}
                                >
                                    Logout
                                </button>

                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
