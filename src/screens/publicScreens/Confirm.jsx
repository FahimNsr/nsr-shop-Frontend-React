import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import CheckoutSteps from "../../components/CheckoutSteps";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const localApi = "http://localhost:8000/";

const Confirm = (props) => {
  const cart = useSelector((state) => state.cart);
  if (!cart.shippingAddress.address) {
    props.history.push("/shipping");
  }
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0) * 0.85);
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0) * 0.15);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(`${localApi}api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      document.body.appendChild(script);
    };
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      props.history.push("/myorders");
    } else {
      if (!window.paypal) {
        addPayPalScript();
      }
    }
  }, [dispatch, props.history, success]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems, paymentResult }));
  };

  return (
    <div>
      <Helmet>
        <title>Confirm | Checkout</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row justify-content-center mx-3">
        <div className="col">
          <h2 className="h6 rounded p-2 my-1 bg-dark">
            <span className=" text-light mx-3">Shipping Address</span>
          </h2>
          <div className="card card-body mb-3 bg-light">
            <p>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address} <br />
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <h2 className="h6 rounded p-2 my-1 bg-dark">
            <span className=" text-light mx-3">Payment Method</span>
          </h2>
          <div className="card card-body mb-3 bg-light">
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          <h2 className="h6 rounded p-2 my-1 bg-dark">
            <span className=" text-light mx-3">Order Items</span>
          </h2>
          <div className="card card-body mb-3 bg-light">
            {cart.cartItems.map((item) => (
              <div key={`${item.product}`} className="d-flex align-items-center justify-content-between text-center ">
                <Link to="#">
                  <img width="60" height="80" src={localApi + item.imageName} alt={`${item.name}`} />
                </Link>
                <Link className="btn" to="#">
                  {item.name}
                </Link>
                <div className="font-size-lg text-secondary">
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-auto">
          <h2 className="h6 rounded p-2 my-1 bg-dark">
            <span className=" text-light mx-3">Order Summary</span>
          </h2>
          <div className="card card-body mb-3 bg-light">
            <div className="d-flex justify-content-between my-2">
              <div>Items</div>
              <div>${cart.itemsPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between my-2">
              <div>Shipping</div>
              <div>${cart.shippingPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between my-2">
              <div>Tax</div>
              <div>${cart.taxPrice.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between my-2">
              <div className="me-4">
                <strong> Order Total</strong>
              </div>
              <div>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            {!sdkReady ? (
              <button
                className="btn btn-sm btn-primary my-4 mx-1"
                type="button"
                onClick={() => setSdkReady(true)}
                disabled={cart.cartItems.length === 0}
              >
                Pay
              </button>
            ) : (
              <>
                <PayPalButton amount={cart.totalPrice.toFixed(2)} onSuccess={successPaymentHandler}></PayPalButton>
              </>
            )}
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Confirm);
