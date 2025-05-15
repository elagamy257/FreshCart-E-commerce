import { useState } from "react";
import img from "../../assets/images/logo1.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { cartContext } from "../../context/cartContext";

export default function Navbar() {
    const [nav, setNav] = useState(false);
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(userContext);
    const { cartNumber } = useContext(cartContext);

    const handleNav = () => {
        if (window.scrollY >= 10) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    window.addEventListener("scroll", handleNav);

    const touchBtn = () => {
        setTouched(!touched);
    };

    const logOut = () => {
        localStorage.removeItem("userToken");
        setLogin(null);
        navigate("/login");
    };

    return (
        <>
            <nav
                className={
                    nav
                        ? "navbar navbar-expand-lg bg-light shadow-sm fixed-top z-3 py-2"
                        : "navbar navbar-expand-lg bg-light shadow-sm fixed-top z-3 py-2"
                }
            >
                <div className="container">
                    <NavLink to="/" className="navbar-brand d-flex align-items-center">
                        <img src={img} alt="FreshCart Logo" style={{ width: "40px" }} />
                        <span className="ms-2 fs-4 fw-bold" style={{ color: "#f28c38" }}>
                            Fresh
                        </span>
                        <span className="fs-4 fw-bold" style={{ color: "#0d6efd" }}>
                            Cart
                        </span>
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={touchBtn}
                        aria-controls="navbar-sticky"
                        aria-expanded={touched}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={
                            touched
                                ? "collapse navbar-collapse show"
                                : "collapse navbar-collapse"
                        }
                        id="navbar-sticky"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isLogin && (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link nav-link-custom ac">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="products" className="nav-link nav-link-custom ac">
                                            Products
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="category" className="nav-link nav-link-custom">
                                            Category
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="brands" className="nav-link nav-link-custom">
                                            Brands
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="carts" className="nav-link nav-link-custom">
                                            Carts
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="allorders" className="nav-link nav-link-custom">
                                            Order
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="d-flex align-items-center">
                            {isLogin && (
                                <NavLink
                                    to="carts"
                                    className="position-relative text-decoration-none text-dark me-3"
                                >
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark rounded-circle"
                                        style={{ fontSize: "0.6rem" }}
                                    >
                                        {cartNumber}
                                    </span>
                                </NavLink>
                            )}

                            <div className="d-flex align-items-center me-3">
                                <i
                                    className="fab fa-instagram me-3"
                                    style={{ transition: "color 0.3s ease", color: "inherit" }}
                                    onMouseOver={(e) => (e.target.style.color = "#0d6efd")}
                                    onMouseOut={(e) => (e.target.style.color = "inherit")}
                                ></i>
                                <i
                                    className="fab fa-facebook me-3"
                                    style={{ transition: "color 0.3s ease", color: "inherit" }}
                                    onMouseOver={(e) => (e.target.style.color = "#0d6efd")}
                                    onMouseOut={(e) => (e.target.style.color = "inherit")}
                                ></i>
                                <i
                                    className="fab fa-youtube"
                                    style={{ transition: "color 0.3s ease", color: "inherit" }}
                                    onMouseOver={(e) => (e.target.style.color = "#0d6efd")}
                                    onMouseOut={(e) => (e.target.style.color = "inherit")}
                                ></i>
                            </div>

                            {!isLogin ? (
                                <>
                                    <NavLink
                                        to="register"
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#0d6efd")
                                        }
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                                    >
                                        Register
                                    </NavLink>
                                    <NavLink
                                        to="login"
                                        className="btn btn-outline-primary btn-sm"
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#0d6efd")
                                        }
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                                    >
                                        Login
                                    </NavLink>
                                </>
                            ) : (
                                <button
                                    onClick={logOut}
                                    className="btn btn-outline-danger btn-sm"
                                    onMouseOver={(e) =>
                                        (e.target.style.backgroundColor = "#dc3545")
                                    }
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
