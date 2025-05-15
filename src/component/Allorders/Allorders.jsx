import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader"
import { jwtDecode } from "jwt-decode";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = jwtDecode(localStorage.getItem("userToken")); 

  const getUserOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Handle error by setting empty array
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-10 col-xl-10 col-xxl-10">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h2 className="fs-4 fw-normal text-center text-secondary mb-4">
                  Your Orders :
                </h2>
                {orders.length === 0 ? (
                  <p className="text-center text-muted">No orders found.</p>
                ) : (
                  orders.map((order, idx) => (
                    <div key={idx} className="border border-light-subtle rounded-3 p-4 mb-4 shadow-sm bg-white">
                      <div className="row gy-3">
                        <div className="col-12 col-md-6">
                          <h3 className="fs-5 fw-semibold text-primary mb-2">
                            Order ID: {order.id}
                          </h3>
                          <p className="text-success fw-bold mb-1">
                            Total Price: ${order.totalOrderPrice}
                          </p>
                          <p className="text-muted mb-1">
                            Payment Method: {order.paymentMethodType}
                          </p>
                          <p className="text-muted mb-1">
                            Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.details}
                          </p>
                          <p
                            className={`fs-6 fw-bold mb-0 ${
                              order.isDelivered ? "text-success" : "text-warning"
                            }`}
                          >
                            Status: {order.isDelivered ? "Delivered" : "Processing"}
                          </p>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="row row-cols-2 g-3">
                            {order.cartItems?.map((item, index) => (
                              <div key={index} className="col">
                                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all duration-300">
                                  <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="card-img-top rounded-top img-fluid"
                                    style={{ height: "150px", objectFit: "cover" }}
                                  />
                                  <div className="card-body text-center p-2">
                                    <h6 className="card-title text-dark mb-1">
                                      {item.product.title}
                                    </h6>
                                    <p className="card-text text-muted mb-1">Qty: {item.count}</p>
                                    <p className="card-text text-muted mb-0">Price: ${item.price}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllOrders;