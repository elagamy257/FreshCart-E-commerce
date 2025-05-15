import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import { useContext } from "react";

const Register = () => {
    const navigate = useNavigate();
    const { setLogin } = useContext(userContext);

    // Values From back-end
    const initialValues = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    };

    // Validation with Yup library
    const validYup = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(3, "At least input 3 characters"),
        email: Yup.string()
            .required("E-mail is required")
            .email("Invalid e-mail format"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                "Password must be at least 6 characters and contain at least one number"
            ),
        rePassword: Yup.string()
            .required("Re-password is required")
            .oneOf([Yup.ref("password")], "Re-password isn't match with password"),
        phone: Yup.string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number"),
    });

    // Send data and calling APIs
    async function signup(values, { setSubmitting, resetForm }) {
        try {
            setSubmitting(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup",
                values
            );
            localStorage.setItem("userToken", data.token);
            setLogin(data.token);
            toast.success(data.message);
            resetForm();
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    }

    // Handle forms by formik
    const formik = useFormik({
        initialValues,
        onSubmit: signup,
        validationSchema: validYup,
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
                                    Register Now :
                                </h2>
                                <form onSubmit={formik.handleSubmit} action="#!">
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.name}
                                                    type="text"
                                                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                                                        }`}
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                                <label htmlFor="name" className="form-label text-primary">
                                                    Name
                                                </label>
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="text-danger">{formik.errors.name}</div>
                                                ) : ""}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    type="email"
                                                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                                                        }`}
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter Your Email"
                                                    required
                                                />
                                                <label htmlFor="email" className="form-label text-primary">
                                                    Email
                                                </label>
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-danger">{formik.errors.email}</div>
                                                ) : ""}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    type="password"
                                                    className={`form-control ${formik.touched.password && formik.errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                    name="password"
                                                    id="password"
                                                    placeholder="Enter Your Password"
                                                    required
                                                />
                                                <label htmlFor="password" className="form-label text-primary">
                                                    Password
                                                </label>
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-danger">{formik.errors.password}</div>
                                                ) : ""}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.rePassword}
                                                    type="password"
                                                    className={`form-control ${formik.touched.rePassword && formik.errors.rePassword
                                                            ? "is-invalid"
                                                            : ""
                                                        }`}
                                                    name="rePassword"
                                                    id="rePassword"
                                                    placeholder="Enter Your Re-password"
                                                    required
                                                />
                                                <label htmlFor="rePassword" className="form-label text-primary">
                                                    Re-password
                                                </label>
                                                {formik.touched.rePassword && formik.errors.rePassword ? (
                                                    <div className="text-danger">{formik.errors.rePassword}</div>
                                                ) : ""}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.phone}
                                                    type="tel"
                                                    className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
                                                        }`}
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="Enter Your Phone"
                                                    required
                                                />
                                                <label htmlFor="phone" className="form-label text-primary">
                                                    Phone
                                                </label>
                                                {formik.touched.phone && formik.errors.phone ? (
                                                    <div className="text-danger">{formik.errors.phone}</div>
                                                ) : ""}
                                            </div>
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
                                                        "Register"
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <p className="m-0 text-secondary text-center">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-primary text-decoration-none hover:underline transition-all"
                                                >
                                                    Log in
                                                </Link>
                                            </p>
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
};

export default Register;