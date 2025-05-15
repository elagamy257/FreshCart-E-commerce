import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const NewPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email format."),
    newPassword: Yup.string()
      .required("New Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "New Password must be at least 6 characters long and contain at least one number."
      ),
  });

  async function signIn(values, { setSubmitting, resetForm }) {
    setSubmitting(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      resetForm();
      toast.success("New password created successfully");
      sessionStorage.clear();
      navigate("/");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return error;
    } finally {
      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: signIn,
    validationSchema: validYup,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("code")) {
      navigate("/forgetPassword");
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
                  New Password :
                </h2>
                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          type="email"
                          className={`form-control ${
                            formik.touched.email && formik.errors.email ? "is-invalid" : ""
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.newPassword}
                          type="password"
                          className={`form-control ${
                            formik.touched.newPassword && formik.errors.newPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          name="newPassword"
                          id="newPassword"
                          placeholder="Enter Your New Password"
                          required
                        />
                        <label htmlFor="newPassword" className="form-label text-primary">
                          New Password
                        </label>
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                          <div className="text-danger">{formik.errors.newPassword}</div>
                        ) : ""}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex justify-content-end gap-2 my-3">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg rounded-pill custom-hover-btn"
                          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                        >
                          {formik.isSubmitting ? (
                            <i className="fa-solid fa-spin fa-spinner text-white"></i>
                          ) : (
                            "Submit"
                          )}
                        </button>
                        <Link
                          to="/login"
                          onClick={() => sessionStorage.clear()}
                          className="btn btn-danger btn-lg rounded-pill custom-hover-btn"
                        >
                          Cancel
                        </Link>
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

export default NewPassword;