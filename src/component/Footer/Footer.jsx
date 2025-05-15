
const Footer = () => {
    return (
        <div className="bg-light-10 py-5">
            <div className="container w-75 mx-auto py-5">
                <div className="text-center">
                    <h1 className="fs-2 text-dark text-capitalize py-3">Get The FreshCart App</h1>
                    <p className="text-muted mb-4">We will send you a link, open it on your phone to download the app</p>
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 py-5 border-bottom border-secondary-subtle">
                    <div className="w-75">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="form-control bg-light border border-secondary-subtle text-dark rounded-pill px-4 py-2 w-100"
                        />
                    </div>
                    <div className="w-auto">
                        <button className="btn btn-primary text-white rounded-pill px-4 py-2">Share App Link</button>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-4 py-5 border-bottom border-secondary-subtle">
                    <div className="d-flex align-items-center gap-3">
                        <h3 className="text-muted fs-5 fw-light mb-0">Payment Partners</h3>
                        <ul className="list-inline d-flex align-items-center gap-2 mb-0">
                            <li className="list-inline-item">
                                <i className="fa-brands fa-cc-paypal fs-3 text-dark"></i>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa-brands fa-cc-amazon-pay fs-3 text-dark"></i>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa-brands fa-cc-mastercard fs-3 text-dark"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <h3 className="text-muted fs-5 fw-light mb-0">Get deliveries with FreshCart</h3>
                        <ul className="list-inline d-flex align-items-center gap-2 mb-0">
                            <li className="list-inline-item">
                                <i className="fa-brands fa-google-play fs-3 text-dark"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;