import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from "../../context/cartContext";
import Loader from "../Loader/Loader"
import { Link } from 'react-router-dom';

export default function Carts() {
  const [product, setProduct] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPanal, setLoadingPanal] = useState(false);
  const { getProductToCart, deleteProductFromCart } = useContext(cartContext);

  const [quantities, setQuantities] = useState({});

  async function getProduct() {
    setIsLoading(true);
    try {
      const { data } = await getProductToCart();
      setProduct(data?.data.products || []);
      setCartId(data?.data._id);
      const initialQuantities = {};
      data?.data.products.forEach(item => {
        initialQuantities[item.product.id] = item.count;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id) {
    setLoadingPanal(true);
    try {
      const { data } = await deleteProductFromCart(id);
      setProduct(data?.data.products || []);
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPanal(false);
    }
  }

  async function clearCart() {
    setLoadingPanal(true);
    try {
      const { data } = await deleteProductFromCart('all');
      setProduct(data?.data.products || []);
      setQuantities({});
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPanal(false);
    }
  }

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => {
      const currentCount = prev[id] || 1;
      const newCount = Math.max(1, currentCount + change);
      return { ...prev, [id]: newCount };
    });
  };

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let totalPrice = product?.reduce((acc, item) => {
    const count = quantities[item.product.id] || item.count;
    return acc + (item.price * count);
  }, 0) || 0;

  if (isLoading) {
          return (
              <Loader/>
          );
      }

  if (!product) {
    return <div className="text-center py-5">No cart data available.</div>;
  }

  return (
    <div className="container py-5 mt-5">
      <div className="w-80 mx-auto bg-light p-4 rounded">
        {product.length === 0 ? (
          <div className="py-5 text-center">
            <h1 className="text-5xl text-primary font-bold">Empty</h1>
          </div>
        ) : (
          
          <div>
            <h1 className="text-4xl font-bold mb-4 text-primary">Shop Cart</h1>

            {product.map((item, index) => (
              <div key={index} className="d-flex flex-wrap align-items-center border-bottom border-2 border-gray-300 py-3" style={{ minHeight: '40vh' }}>
                <div className="col-3 col-md-2 p-2">
                  <img src={item.product.imageCover} className="w-75 rounded" alt={item.product.title} style={{ maxHeight: '120px', objectFit: 'contain' }} />
                </div>
                <div className="col-6 col-md-5 p-2">
                  <h2 className="text-2xl font-semibold mb-2">{item.product.title}</h2>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm mx-2 p-1"
                      onClick={() => handleQuantityChange(item.product.id, -1)}
                      disabled={loadingPanal}
                    >
                      <i className="fas fa-minus text-gray-700"></i>
                    </button>
                    <span className="mx-2">{quantities[item.product.id] || item.count}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm mx-2 p-1"
                      onClick={() => handleQuantityChange(item.product.id, 1)}
                      disabled={loadingPanal}
                    >
                      <i className="fas fa-plus text-gray-700"></i>
                    </button>
                  </div>
                </div>
                <div className="col-3 col-md-2 text-center p-2">
                  <p className="text-xl font-semibold">{(item.price * (quantities[item.product.id] || item.count)).toFixed(2)} EGP</p>
                </div>
                <div className="col-3 col-md-2 text-center p-2">
                  <button onClick={() => deleteProduct(item?.product?.id)} className="btn btn-link text-primary">
                    <i className="fas fa-trash-can fa-lg"></i> Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
              <h3 className="text-2xl font-bold">
                Total Price: <span className="text-primary">{totalPrice.toFixed(2)} EGP</span>
              </h3>
              <div className="mt-2">
                <button
                  onClick={clearCart}
                  className={`btn rounded-pill px-3 py-2 text-white me-2 ${product.length === 0 ? 'bg-danger opacity-50' : 'bg-danger'}`}
                  disabled={product.length === 0}
                >
                  Clear
                </button>
                <Link
                  to={`/checkout/${cartId}`}
                  className={`btn rounded-pill px-3 py-2 text-white ${product.length === 0 ? 'bg-primary opacity-50' : 'bg-primary'}`}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}