import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import { useContext } from "react";

export default function Login() {
    let { setLogin } = useContext(userContext);

    let navigate = useNavigate();
    async function handleLogin(formsData) {
        console.log("login", formsData);
        axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formsData)
            .then((response) => {
                console.log("success", response);
                if (response.data.message === "success") {
                    localStorage.setItem("userToken", response.data.token);
                    setLogin(response.data.token);
                    navigate("/"); //programmatic routing
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    // validation
    let validationSchema = Yup.object({
        email: Yup.string()
            .required("email is required")
            .email("enter valid email"), //check on email
        password: Yup.string()
            .required("password is required")
            .matches(/^[A-Z][a-z0-9]{6,8}$/, "password is not valid"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3"></div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                                    Login Now
                                </h2>
                                <form onSubmit={formik.handleSubmit} action="#!">
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    type="email"
                                                    className={`form-control ${formik.touched.email && formik.errors.email
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    name="email"
                                                    value={formik.values.email}
                                                    id="email"
                                                    placeholder="name@example.com"
                                                    required
                                                />
                                                <label htmlFor="email" className="form-label text-primary">
                                                    Email
                                                </label>
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-danger">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    type="password"
                                                    className={`form-control ${formik.touched.password && formik.errors.password
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    name="password"
                                                    value={formik.values.password}
                                                    id="password"
                                                    placeholder="Password"
                                                    required
                                                />
                                                <label htmlFor="password" className="form-label text-primary">
                                                    Password
                                                </label>
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-danger">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <p className=" mb-3">
                                                <Link
                                                    to="/forgetPassword"
                                                    className="text-primary text-decoration-none hover:underline transition-all"
                                                >
                                                    Forget Password
                                                </Link>{" "}
                                                <br />
                                            </p>
                                            <p className="text-secondary text-center mb-3">
                                                Don't have an account{" "} 
                                                <Link
                                                    to="/register"
                                                    className="text-primary text-decoration-none hover:underline transition-all"
                                                >
                                                    Register Now !
                                                </Link>
                                            </p>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid my-3">
                                                <button
                                                type="submit"
                                                className="btn btn-primary btn-lg rounded-pill custom-hover-btn"
                                                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                                                >
                                                {formik.isSubmitting ? (
                                                    <i className="fa-solid fa-spin fa-spinner text-white fa-lg"></i>
                                                ) : (
                                                    "Login"
                                                )}
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
