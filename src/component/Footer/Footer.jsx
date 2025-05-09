import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-5" data-section>
            <div className="container">
                <div className="row footer-top mb-5">
                    <div className="col-md-3">
                        <ul className="list-unstyled">
                            <li>
                                <h5 className="text-primary fw-bold mb-3">Company</h5>
                            </li>
                            <li>
                                <p className="text-white mb-2">
                                    Find a location nearest you. See{' '}
                                    <a href="#" className="text-primary text-decoration-none">
                                        Our Stores
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p className="text-white fw-bold mb-2">+20 1093911076</p>
                            </li>
                            <li>
                                <p className="text-white mb-2">elagamy257@gmail.com</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <ul className="list-unstyled">
                            <li>
                                <h5 className="text-primary fw-bold mb-3">Useful Links</h5>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    New Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Best Sellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Bundle & Save
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Online Gift Card
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <ul className="list-unstyled">
                            <li>
                                <h5 className="text-primary fw-bold mb-3">Information</h5>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Start a Return
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Shipping FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none d-block mb-2">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <div className="footer-list">
                            <h5 className="text-primary fw-bold mb-3">Good Emails.</h5>
                            <p className="text-white mb-3">
                                Enter your email below to be the first to know about new collections and product launches.
                            </p>
                            <form className="d-flex">
                                <input
                                    type="email"
                                    name="email_address"
                                    placeholder="Enter your email address"
                                    required
                                    className="form-control me-2 rounded"
                                />
                                <button type="submit" className="btn btn-primary rounded">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom border-top border-secondary pt-4">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">
                                        <i className="fab fa-twitter fs-5 mx-2"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">
                                        <i className="fab fa-facebook-f fs-5 mx-2"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">
                                        <i className="fab fa-instagram fs-5 mx-2"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-white">
                                        <i className="fab fa-youtube fs-5 mx-2"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center">
                            <p className="text-white mb-0">© 2025 elagamy257</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <img
                                src="./images/pay.png"
                                width="313"
                                height="28"
                                alt="available all payment method"
                                className="img-fluid"
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;