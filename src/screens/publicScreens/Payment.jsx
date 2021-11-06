import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

  const Payment = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/confirm");
  };

  return (
    <div>
                  <Helmet>
        <title>Payment | Checkout</title>
      </Helmet>

      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-8 col-auto">
          <div className="card text-black">
            <div className="card-body ">
              <div className="justify-content-center">
                <h2 className="text-center fw-bold m-4 ">Payment Method</h2>
                <form onSubmit={submitHandler}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-check flex-fill m-2">
                      <input
                        className="form-check-input"
                        name="paymentMethod"
                        type="radio"
                        value="Paypal"
                        required
                        checked
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                      <label className="form-check-label">Paypal</label>
                    </div>
                  </div>
                  <button type="submit" className="form-control btn btn-success opacity-75 m-2">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Payment);
