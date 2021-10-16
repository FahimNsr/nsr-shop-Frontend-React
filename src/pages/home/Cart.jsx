import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    return (
        <div className="container px-5 mt-5 ">
            <div className="row">
                <div className="col-xl-9 col-md-8">
                    <h2 className="h6 d-flex flex-wrap justify-content-between align-items-center p-2 bg-dark">
                        <span className=" text-light mx-3">Products</span>
                        <Link className=" btn text-light" to="#">
                            Continue shopping
                        </Link>
                    </h2>
                    <div className="d-sm-flex justify-content-between mx-2">
                        <div className="d-sm-flex text-center">
                            <Link to="#">
                                <img
                                    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1631652954000"
                                    alt="Product"
                                    width="120"
                                    height="150"
                                />
                            </Link>
                            <div className="mt-5">
                                <Link className="btn" to="#">
                                    Apple iPhone 13 Pro
                                </Link>
                                <div className="font-size-lg text-secondary pt-2">$19.00</div>
                            </div>
                        </div>
                        <div className="p-4 mx-auto mx-sm-0 text-center text-sm-left">
                            <div className="form-group mb-2">
                                <label>Quantity</label>
                                <input className="form-control" type="number" defaultValue="1" />
                            </div>
                            <button className="btn btn-outline-secondary btn-sm  m-2" type="button">
                                Update cart
                            </button>
                            <button className="btn btn-outline-danger btn-sm  m-2" type="button">
                                Remove
                            </button>
                        </div>
                    </div>
                    <hr className="mx-3"/>
                </div>
                <div className="col-xl-3 text-center col-md-4 pt-3 pt-md-0">
                    <h2 className="h6 p-3 bg-dark text-light">Subtotal</h2>
                    <div className="h3 font-weight-semibold py-3">$325.00</div>
                    <hr className="mx-3"/>
                    <Link className="btn btn-outline-primary my-2 mx-1" to="#">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
