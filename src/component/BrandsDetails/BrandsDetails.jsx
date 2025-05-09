import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader"
import { Link, useParams } from "react-router-dom";

const BrandsDetails = () => {
    const { id } = useParams();
    const [brand, setBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
                setBrand(response.data.data);
            } catch (error) {
                console.error("Error fetching brand details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrandDetails();
    }, [id]); // Dependency on `id` to refetch if the ID changes

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="py-5 mt-5 position-relative">
            <Link
                to="/brands"
                className="position-absolute top-4 end-0 z-3 btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px", marginRight: "1rem" }}
            >
                <i className="fas fa-times fa-lg"></i>
            </Link>
            <div className="container">
                <h1 className="text-3xl py-4 fw-bold">Brand Details:</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 p-4 shadow-lg border border-gray-300 rounded-3">
                        <img src={brand?.image} className="w-100" alt={brand?.name} />
                        <figcaption className="text-center py-2">
                            <p className="fw-bold fs-4">{brand?.name}</p>
                        </figcaption>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandsDetails;