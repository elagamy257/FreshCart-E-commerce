import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  async function signIn(values, { setSubmitting, resetForm }) {
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      resetForm();
      toast.success(data.message);
      navigate("/resetPassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email format."),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: signIn,
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
                  Forget Password :
                </h2>
                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label text-primary mb-1">
                        Email
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="email"
                        className={`form-control bg-gray-50 border border-gray-300 ${
                          formik.touched.email && formik.errors.email ? "is-invalid" : ""
                        }`}
                        name="email"
                        value={formik.values.email}
                        id="email"
                        placeholder="name@example.com"
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
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

export default ForgetPassword;