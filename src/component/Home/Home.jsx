import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const { addProductToCart } = useContext(cartContext);

  async function addProductItem(id) {
    setLoadingProductId(id);
    try {
      const response = await addProductToCart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoadingProductId(null);
    }
  }

  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      toast.error("Failed to load products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
      return (
          <Loader/>
      );
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="p-3">
          <HomeSlider />
        </div>

        <div>
          <h3 className="display-6 fw-bold mb-4 text-capitalize text-primary text-center">
            Shop Popular Categories
          </h3>
          <CategorySlider />
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 p-3">
          {products.map((item, idx) => (
            <div key={idx} className="col">
              <div className="card rounded-3 shadow-lg p-2 h-100">
                <Link to={`/productDetails/${item.id}`} className="text-decoration-none">
                  <figure>
                    <img
                      className="card-img-top rounded-top"
                      src={item.imageCover}
                      alt={item.title}
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                  </figure>
                  <div className="p-3">
                    <h5 className="fs-6 fw-bold text-primary">
                      {item.category.name}
                    </h5>
                    <span className="fs-6 fw-semibold text-dark">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-3 py-1">
                    <span className="text-muted">{item.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-warning"></i> {item.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="d-flex justify-content-between align-items-center p-2">
                  <button
                    onClick={() => addProductItem(item.id)}
                    className="w-75 fw-bold btn btn-primary rounded-3 text-white py-2 disabled:opacity-50"
                    disabled={loadingProductId === item.id}
                  >
                    {loadingProductId === item.id ? (
                      <i className="fas fa-spinner fa-spin fa-lg"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}