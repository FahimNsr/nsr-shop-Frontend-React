import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                        <img
                            className="card-img"
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1631652954000"
                            alt="Vans"
                        />
                        <div className="card-body">
                            <h4 className="card-title">Iphone 13 pro blue</h4>
                            <div className="buy d-flex justify-content-between align-items-center">
                                <div className="price text-success">
                                    <h5 className="mt-4">$125</h5>
                                </div>
                                <Link to="#" className="btn btn-outline-primary mt-3">
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                        <img
                            className="card-img"
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1631652954000"
                            alt="Vans"
                        />
                        <div className="card-body">
                            <h4 className="card-title">Iphone 13 pro white</h4>
                            <div className="buy d-flex justify-content-between align-items-center">
                                <div className="price text-success">
                                    <h5 className="mt-4">$125</h5>
                                </div>
                                <button className="btn btn-outline-primary mt-3">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
