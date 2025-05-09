import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import Loader from "../Loader/Loader"

export default function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState(null);
  let { addProductToCart } = useContext(cartContext);

  async function addProductItem(id) {
    setLoading(true);
    try {
      let response = await addProductToCart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data);
        setDetails(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProductDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
        <Loader/>
    );
}

  return (
    <div className="container py-5 mt-5">
      <div className="row align-items-center">
        <div className="col-md-4 p-4">
          <img src={details?.imageCover} alt={details?.title} className="w-100 rounded" />
        </div>
        <div className="col-md-8 p-4">
          <h1 className="mb-3 text-2xl font-semibold capitalize">{details?.title}</h1>
          <p className="mb-3 text-gray-700">{details?.description}</p>
          <span className="font-bold">{details?.category.name}</span>
          <div className="d-flex justify-content-between align-items-center my-3">
            <span>{details?.price} EGP</span>
            <span>
              <i className="fas fa-star text-warning"></i> {details?.ratingsAverage}
            </span>
          </div>
          <div className="text-center">
            <button
              onClick={() => addProductItem(details?.id)}
              className="w-100 btn btn-primary rounded py-2"
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin fa-lg"></i>
              ) : (
                <>
                  <i className="fas fa-plus me-2"></i>Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}