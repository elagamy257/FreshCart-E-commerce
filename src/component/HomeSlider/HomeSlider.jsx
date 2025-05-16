import slider1 from './../../assets/images/img2.jpg';
import slider2 from './../../assets/images/img5.jpg';
import slider3 from './../../assets/images/img7.jpg';
import slider4 from './../../assets/images/img1.jpg';
import img1 from './../../assets/images/slider1.jpg';
import img2 from './../../assets/images/slider2.jpg';
import Slider from "react-slick";

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: i => (
      <div className="mt-3 rounded-pill bg-dark bg-opacity-50 w-2 h-1">
        <div className="d-none">{i + ""}</div>
      </div>
    ),
    appendDots: dots => (
      <div>
        <ul className="m-0">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="py-5 mb-5">
      <div className="container">
        <div className="row g-0 justify-content-center align-items-center">
          <div className="col-12 col-md-8 mb-4 mb-md-0">
            <Slider {...settings}>
              <div>
                <img src={slider1} className="w-100 " style={{ height: '24rem', objectFit: 'cover' }} alt="Slider 1" />
              </div>
              <div>
                <img src={slider2} className="w-100 " style={{ height: '24rem', objectFit: 'cover' }} alt="Slider 2" />
              </div>
              <div>
                <img src={slider3} className="w-100 " style={{ height: '24rem', objectFit: 'cover' }} alt="Slider 3" />
              </div>
              <div>
                <img src={slider4} className="w-100 " style={{ height: '24rem', objectFit: 'cover' }} alt="Slider 4" />
              </div>
            </Slider>
          </div>
          <div className="col-12 col-md-4 ">
            <div className="d-flex flex-column">
              <img src={img1} className="w-100  " style={{ height: '12rem', objectFit: 'cover' }} alt="Banner 1" />
              <img src={img2} className="w-100 " style={{ height: '12rem', objectFit: 'cover' }} alt="Banner 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;