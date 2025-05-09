import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
                setBrands(response.data.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrands();
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="cat py-5 mt-5 position-relative">
            <div className="container py-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {brands.map((brand, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 border border-gray-300 rounded-3 shadow-sm transition-all hover-shadow-md hover-translate-up">
                                <Link to={`/brand-details/${brand._id}`}>
                                    <div className="card-body p-4 text-center">
                                        <img
                                            src={brand.image}
                                            className="card-img-top brand-image mx-auto d-block"
                                            alt={brand.name}
                                        />
                                    </div>
                                    <div className="card-footer text-center py-3 border-0">
                                        <h2 className="card-title h5 mb-0 fw-semibold">{brand.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;