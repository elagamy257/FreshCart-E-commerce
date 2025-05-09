import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getCategorys() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategory(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategorys();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: (i) => (
      <div className="mt-3 rounded-pill bg-dark bg-opacity-50 w-2 h-1">
        <div className="visually-hidden">{i + ''}</div>
      </div>
    ),
    appendDots: (dots) => (
      <ul className="list-unstyled" style={{ margin: '0' }}>{dots}</ul>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="h-64 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Slider {...settings}>
        {category.map((item, index) => (
          <div key={index} className="px-2">
            <div className="card h-100">
              <img src={item.image} className="card-img-top rounded" alt={item.name} style={{ height: '15rem', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h6 className="card-title text-dark">{item.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}