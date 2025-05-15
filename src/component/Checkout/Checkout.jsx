import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("cash");

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function handleOrder(values, { setSubmitting, resetForm }) {
    try {
      setSubmitting(true);
      if (paymentType === "cash") {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          { shippingAddress: values },
          { headers }
        );
        resetForm();
        toast.success(data.status || "Order placed successfully");
        navigate("/allorders");
      } else {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          { shippingAddress: values },
          {
            headers,
            params: { url: "http://localhost:5173" },
          }
        );
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .required("Details are required")
      .min(3, "At least input 3 characters"),
    city: Yup.string()
      .required("City is required")
      .min(3, "At least input 3 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be an Egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleOrder,
    validationSchema,
  });

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3"></div>
                <h2 className="fs-4 fw-bold text-center text-primary mb-4">
                  Payment
                </h2>
                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="city" className="form-label text-primary mb-1">
                        City
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className={`form-control bg-gray-50 border border-gray-300 ${formik.touched.city && formik.errors.city ? "is-invalid" : ""
                          }`}
                        name="city"
                        value={formik.values.city}
                        id="city"
                        placeholder="City"
                        required
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="text-danger">{formik.errors.city}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="phone" className="form-label text-primary mb-1">
                        Phone
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="tel"
                        className={`form-control bg-gray-50 border border-gray-300 ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
                          }`}
                        name="phone"
                        value={formik.values.phone}
                        id="phone"
                        placeholder="Phone"
                        required
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="text-danger">{formik.errors.phone}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="details" className="form-label text-primary mb-1">
                        Details
                      </label>
                      <textarea
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control bg-gray-50 border border-gray-300 ${formik.touched.details && formik.errors.details ? "is-invalid" : ""
                          }`}
                        style={{ height: "100px" }}
                        name="details"
                        value={formik.values.details}
                        id="details"
                        placeholder="Details"
                        required
                      />
                      {formik.touched.details && formik.errors.details && (
                        <div className="text-danger">{formik.errors.details}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="form-check mb-2">
                        <input
                          disabled={
                            !formik.isValid || !formik.dirty || formik.isSubmitting
                          }
                          value="cash"
                          onChange={() => setPaymentType("cash")}
                          checked={paymentType === "cash"}
                          id="Cash"
                          type="radio"
                          name="paymentType"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="Cash"
                          className="form-check-label text-dark"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          disabled={
                            !formik.isValid || !formik.dirty || formik.isSubmitting
                          }
                          value="online"
                          onChange={() => setPaymentType("online")}
                          checked={paymentType === "online"}
                          id="Online"
                          type="radio"
                          name="paymentType"
                          className="form-check-input"
                        />
                        <label
                          htmlFor="Online"
                          className="form-check-label text-dark"
                        >
                          Online
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex justify-content-end gap-2 my-3">
                        <button
                          type="submit"
                          className="btn btn-primary rounded-pill px-3 py-2 btn-lg custom-hover-btn"
                          disabled={
                            !formik.isValid || !formik.dirty || formik.isSubmitting
                          }
                        >
                          {formik.isSubmitting ? (
                            <i className="fa-solid fa-spin fa-spinner text-white fa-lg"></i>
                          ) : paymentType === "cash" ? (
                            "Pay with Cash"
                          ) : (
                            "Pay Online"
                          )}
                        </button>
                        <Link
                          to="/carts"
                          className="btn btn-danger rounded-pill px-3 py-2 btn-lg custom-hover-btn"
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
}
