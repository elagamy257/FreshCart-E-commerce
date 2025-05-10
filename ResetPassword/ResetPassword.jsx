import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ResetPassword = () => {
    const navigate = useNavigate();

    const initialValues = {
        resetCode: "",
    };

    const validationSchema = Yup.object().shape({
        resetCode: Yup.string()
            .required("Reset code is required")
            .matches(/^\d{5,6}$/, "Reset code must be 5 or 6 digits"),
    });

    async function resetCode(values, { setSubmitting, resetForm }) {
        const x = { resetCode: values.resetCode.toString() };
        setSubmitting(true);
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                x
            );
            resetForm();
            toast.success(data.status);
            sessionStorage.setItem("code", x.resetCode);
            navigate("/newPassword");
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid reset code");
        } finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: resetCode,
        validationSchema,
    });

    useEffect(() => {
        if (sessionStorage.getItem("code") == null) {
            navigate("/resetPassword");
        }
    }, [navigate]);

    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3"></div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                                    Reset Now :
                                </h2>
                                <form onSubmit={formik.handleSubmit} action="#!">
                                    <div className="row gy-2 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    type="text"
                                                    className={`form-control ${formik.touched.resetCode && formik.errors.resetCode
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    name="resetCode"
                                                    value={formik.values.resetCode}
                                                    id="resetCode"
                                                    placeholder="Enter Reset Code"
                                                    required
                                                />
                                                <label htmlFor="resetCode" className="form-label text-primary">
                                                    Reset Code
                                                </label>
                                                {formik.touched.resetCode && formik.errors.resetCode ? (
                                                    <div className="text-danger">{formik.errors.resetCode}</div>
                                                ) : null}
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
                                                        <i className="fa-solid fa-spin fa-spinner text-white"></i>
                                                    ) : (
                                                        "Submit"
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
};

export default ResetPassword;