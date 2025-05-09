import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from "../Loader/Loader"
import { Link, useParams } from 'react-router-dom';

export default function CategoryDetails() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function getCategoryDetails() {
        setIsLoading(true);
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then(({ data }) => {
                setCategory(data?.data || null);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getCategoryDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
            return (
                <Loader/>
            );
        }

    if (!category) {
        return <div className="text-center py-5">No category data available.</div>;
    }

    return (
        <div className="py-5 mt-5 position-relative">
            <Link to="/category" className="position-absolute top-5 end-5 z-50 border border-gray-300 rounded-circle w-10 h-10 d-flex justify-content-center align-items-center text-decoration-none">
                <i className="fa-solid fa-xl fa-close text-dark"></i>
            </Link>
            <div className="container py-5" style={{ width: '80%', margin: '0 auto' }}>
                <h1 className="text-3xl font-bold py-4">Category Details:</h1>
                <div className="d-flex justify-content-center">
                    <div className="col-md-4 p-4 shadow border border-gray-300" style={{ borderRadius: '1rem' }}>
                        <figure>
                            <img src={category.image} className="img-fluid w-100" style={{ height: '400px', objectFit: 'cover' }} alt={category.name} />
                        </figure>
                        <figcaption className="text-center py-2">
                            <p className="font-bold text-2xl text-dark">{category.name}</p>
                        </figcaption>
                    </div>
                </div>
            </div>
        </div>
    );
}