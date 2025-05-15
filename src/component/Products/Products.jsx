import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

export default function Products() {
  const [subProduct, setSubProduct] = useState([]);
  const [loading, setLoading] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-ratingsAverage");

  const { addProductToCart } = useContext(cartContext);

  const handleGetAllProducts = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
        params: {
          limit: 20,
          page,
          sort,
        },
      });
      setSubProduct(data.data);
      setCurrentItem(data);
    } catch (error) {
      toast.error("Failed to load products.");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  async function getDataProduct(id) {
    setLoading(id);
    try {
      const response = await addProductToCart(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? "Please log in to add products to your cart"
          : "Something went wrong");
      toast.error(errorMessage);
    } finally {
      setLoading(null);
    }
  }

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1); // Reset page to 1 when sorting changes
  };

  const handlePage = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    handleGetAllProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  if (loader) {
    return <Loader />;
  }

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center gap-3 py-4">
          <label htmlFor="sort" className="fs-2 text-primary">
            <i className="fa-solid fa-filter"></i>
          </label>
          <select
            value={sort}
            className="form-select py-1 px-5 rounded-4 border border-primary focus-ring focus-ring-primary text-center"
            style={{ fontSize: "1rem", width: "auto", marginRight: "3rem" }}
            onChange={handleSort}
            id="sort"
          >
            <option value="title">A - Z</option>
            <option value="-price">High - Low</option>
            <option value="-title">Z - A</option>
            <option value="price">Low - High</option>
            <option value="-ratingsAverage">Top Rated</option>
          </select>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {subProduct.map((item) => (
            <div key={item.id} className="col">
              <div className="card rounded-3 shadow-sm p-2 h-100">
                <Link to={`/productDetails/${item.id}`} className="text-decoration-none">
                  <figure>
                    <img
                      src={item.imageCover}
                      className="card-img-top rounded-top img-fluid"
                      alt={item.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </figure>
                  <div className="p-2">
                    <h5 className="fs-6 fw-bold text-primary">
                      {item.title.split(" ", 5).join(" ")}
                    </h5>
                    <p className="text-muted small">{item.category.name}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-2 py-1">
                    <span className="text-muted">{item.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-warning"></i> {item.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="p-2">
                  <button
                    onClick={() => getDataProduct(item.id)}
                    className="btn btn-primary w-100 rounded-3 py-1"
                    disabled={loading === item.id}
                  >
                    {loading === item.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={<i className="fa-solid fa-angle-left"></i>}
          nextLabel={<i className="fa-solid fa-angle-right"></i>}
          className="d-flex justify-content-center gap-2 cursor-pointer py-3"
          pageClassName="border border-gray-300 rounded px-3 py-1"
          activeClassName="bg-primary text-white border-primary"
          breakLabel={null}
          breakClassName="d-none"
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          pageCount={currentItem?.metadata?.numberOfPages || 1}
          onPageChange={handlePage}
          forcePage={page - 1}
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
}