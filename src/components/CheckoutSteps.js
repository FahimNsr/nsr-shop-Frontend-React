import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps(props) {
  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <h6 className="col p-2 m-3 btn text-light bg-success">Login</h6>
        <Link className={"col p-2 m-3 btn text-light " + (props.step2 ? " bg-success" : "bg-secondary")} to="/shipping">
          Shipping
        </Link>
        <Link className={"col p-2 m-3 btn text-light " + (props.step3 ? " bg-success" : "bg-secondary")} to="/payment">
          Payment
        </Link>
        <Link className={"col p-2 m-3 btn text-light " + (props.step4 ? " bg-success" : "bg-secondary")} to="/confirm">
          Confirm
        </Link>
        <h6 className="col p-2 m-3 btn text-light bg-secondary" >
          Pay & Done!
        </h6>
      </div>

      {/* <div className=" bg-dark ">
        <div className=" container d-flex justify-content-center bg-dark p-2 ">
          <Link className="btn link-light" to="/">
            Home
          </Link>
          <Link className="btn link-light" to="/cart">
            Cart
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-between m-3">
        <div className={"col p-2 m-3 btn text-light " + (props.step1 ? " bg-success" : " bg-secondary")}>Login</div>
        <div className={"col p-2 m-3 btn text-light " + (props.step2 ? " bg-success" : " bg-secondary")}>
          <Link className="text-light text-decoration-none " to="/shipping">
            Shipping
          </Link>
        </div>
        <div className={"col p-2 m-3 btn text-light " + (props.step3 ? " bg-success" : " bg-secondary")}>
          <Link className="text-light text-decoration-none " to="/payment">
            Payment
          </Link>
        </div>
        <div className={"col p-2 m-3 btn text-light " + (props.step4 ? " bg-success" : " bg-secondary")}>
          <Link className="text-light text-decoration-none " to="/placeorder">
            Place Order
          </Link>
        </div>
      </div> */}
    </>
  );
}
