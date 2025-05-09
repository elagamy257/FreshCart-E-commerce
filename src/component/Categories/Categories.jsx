import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from "../Loader/Loader"
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function getCategories() {
        setIsLoading(true);
        axios
            .get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({ data }) => {
                setCategories(data.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="cat py-4 mt-4">
            <div className="container py-4" style={{ width: '60%', margin: '0 auto' }}>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {categories.map((category, index) => (
                        <div key={index} className="col">
                            <div className="card border border-gray-300" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                                <Link to={`/category-details/${category._id}`} className="text-decoration-none">
                                    <div className="card-body p-0 text-center">
                                        <figure>
                                            <img src={category.image} className="img-fluid w-100" style={{ height: '18rem', objectFit: 'cover' }} alt={category.name} />
                                        </figure>
                                    </div>
                                    <div className="card-footer bg-transparent border-0 py-3">
                                        <h2 className="card-title text-2xl font-bold text-dark text-center">{category.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}