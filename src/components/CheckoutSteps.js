import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps(props) {
  return (
    <>
      <div className="row justify-content-center m-3">
        <h6 className="col m-1 btn text-light bg-success"> Login </h6>
        <Link className={"col m-1 btn text-light " + (props.step2 ? " bg-success" : "bg-secondary")} to="/shipping">
          Shipping
        </Link>
        <Link className={"col m-1 btn text-light " + (props.step3 ? " bg-success" : "bg-secondary")} to="/payment">
          Payment
        </Link>
        <Link className={"col m-1 btn text-light " + (props.step4 ? " bg-success" : "bg-secondary")} to="/confirm">
          Confirm
        </Link>
        <h6 className="col m-1 btn text-light bg-secondary">Pay&Done!</h6>
      </div>
    </>
  );
}
