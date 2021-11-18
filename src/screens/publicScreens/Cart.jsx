import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart, updateCart } from "../../actions/cartActions";
import { CART_RESET_MESSAGE } from "../../constants/cartConstants";
import MessageBox from "../../components/MessageBox";
const pathFile = "http://localhost:8000/";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, error, messages } = cart;

  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/shipping");
  };
  useEffect(() => {
    dispatch(updateCart());
    return () => {
      dispatch({ type: CART_RESET_MESSAGE });
    };
  }, [cartItems, dispatch]);

  return (
    <div className="row justify-content-center m-5">
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {error && <MessageBox variant="danger">{error}</MessageBox>}

      <div className="col">
        <h2 className=" h6 d-flex flex-wrap justify-content-between align-items-center rounded p-3 bg-dark">
          <span className=" text-light mx-3">Cart Items</span>
        </h2>
        {messages &&
          messages.map((message, i) => (
            <MessageBox key={i} variant="warning">
              {message}
            </MessageBox>
          ))}
        {cartItems.length === 0 ? (
          <MessageBox>
            Your Cart is empty. <Link to="/products">Go Shopping</Link>
          </MessageBox>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.product}`}>
              <div className="d-flex align-items-center justify-content-between text-center ">
                <Link to={`/product/${item.product}`}>
                  <img width="120" height="150" src={pathFile + item.imageName} alt={`${item.name}`} />
                </Link>
                <Link className="btn" to={`/product/${item.product}`}>
                  {item.name}
                </Link>
                <div className="font-size-lg text-secondary">${item.price}</div>
                <div className="justify-content-end">
                  <select
                    className="btn btn-sm btn-outline-dark m-1"
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-sm btn-outline-danger m-1"
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className="mx-3" />
            </div>
          ))
        )}
      </div>
      <div className="col-auto col-xl-4 col-lg-4 col-md-4 text-center">
        <h2 className="h6 p-3 bg-dark rounded text-light ">
          Subtotal <br />
        </h2>
        {cartItems.length ? cartItems.reduce((a, c) => a + c.qty, 0) + " Item(s)" : "No Items "}
        <div className="h3 font-weight-semibold my-4 py-3">
          {cartItems.length ? "$" + cartItems.reduce((a, c) => a + c.price * c.qty, 0) : null}
        </div>
        <hr className="mx-3" />
        <button
          className="btn btn-sm btn-outline-primary my-4 mx-1"
          type="button"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
