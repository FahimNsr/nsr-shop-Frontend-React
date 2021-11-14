import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

const ShippingAddress = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
    props.history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="row d-flex justify-content-center align-items-center ">
        <Helmet>
          <title>Shipping Address | Checkout </title>
        </Helmet>

        <div className="col-8 col-auto">
          <div className="card text-black">
            <div className="card-body ">
              <div className="justify-content-center">
                <h2 className="text-center fw-bold m-4 ">Shipping Address</h2>
                <form onSubmit={submitHandler}>
                  <div className="row align-items-center mb-2">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Full Name</label>
                      <input
                        className={"form-control"}
                        name="fullname"
                        type="text"
                        maxLength="64"
                        value={fullName ? fullName : ""}
                        required
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-2">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        name="address"
                        type="text"
                        value={address ? address : ""}
                        required
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-2">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="col-auto form-outline flex-fill mb-0">
                      <label className="form-label">Postal Code</label>
                      <input
                        className="form-control"
                        name="PostalCode"
                        type="number"
                        value={postalCode ? postalCode : ""}
                        required
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-2">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="col-auto form-outline flex-fill mb-0">
                      <label className="form-label">City</label>
                      <input
                        className="form-control"
                        name="city"
                        type="text"
                        value={city ? city : ""}
                        required
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-2">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="col-auto form-outline flex-fill mb-1">
                      <label className="form-label">Country</label>
                      <input
                        className="form-control"
                        name="country"
                        type="text"
                        value={country ? country : ""}
                        required
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="form-control btn btn-success opacity-75">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ShippingAddress);
