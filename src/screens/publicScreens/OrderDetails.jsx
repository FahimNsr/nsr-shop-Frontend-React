import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const localApi = "http://localhost:8000/";

export default function OrderDetails() {
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!order || (order && order._id !== id)) {
      dispatch(detailsOrder(id));
    }
  }, [dispatch, order, id]);

  return (
    <div>
      <div className="d-flex justify-content-between m-3">
        <Link className="col p-2 m-3 btn text-light bg-secondary" to="/profile">
          Personal Details
        </Link>
        <Link className="col p-2 m-3 btn text-light bg-dark opacity-75" to="/myorders">
          My Orders
        </Link>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>Order: {id} </title>
          </Helmet>

          <div className=" d-flex rounded justify-content-between p-2 my-1 bg-success bg-gradient mx-4 ">
            <span className="h6 text-light ms-3">Order Number : {id}</span>
            <span className="h6 text-light me-3">Order Date : {order.createdAt.substring(0, 10)}</span>
          </div>
          <div className="row m-4">
            <div className="col-8">
              <h2 className="h6 rounded p-2 my-1 bg-dark">
                <span className=" text-light mx-3">Order Item(s)</span>
              </h2>
              <div className="card card-body mb-3 bg-light">
                {order.orderItems.map((item) => (
                  <div
                    key={`${item.product}`}
                    className="d-flex align-items-center justify-content-between text-center "
                  >
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
              <h2 className="h6 rounded p-2 my-1 bg-dark">
                <span className=" text-light mx-3">Delivery Address</span>
              </h2>
              <div className="card card-body mb-3 bg-light">
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address} <br />
                  <strong> {order.shippingAddress.postalCode}, </strong>
                  <strong> {order.shippingAddress.city}, </strong>
                  <strong> {order.shippingAddress.country}, </strong>
                </p>
              </div>
            </div>
            <div className="col-4  ">
              <h2 className="h6 rounded p-2 my-1 bg-dark">
                <span className=" text-light mx-3">Total</span>
              </h2>
              <div className="card card-body mb-3 bg-light">
                <div className="d-flex justify-content-between my-2">
                  <div>Subtotal:</div>
                  <div>${order.itemsPrice}</div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div>Tax:</div>
                  <div>${order.taxPrice}</div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div>Delivery:</div>
                  <div>${order.shippingPrice}</div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <strong>Total:</strong>
                  <strong>${order.totalPrice}</strong>
                </div>
              </div>
              <h2 className="h6 rounded p-2 my-1 bg-dark">
                <span className=" text-light mx-3">Payment</span>
              </h2>
              <div className="card card-body mb-3 bg-light">
                <div className="d-flex justify-content-between my-2">
                  <div>Payment Method:</div>
                  <strong>{order.paymentMethod}</strong>
                </div>
              </div>
              <h2 className="h6 rounded p-2 my-1 bg-dark">
                <span className=" text-light mx-3">Delivery</span>
              </h2>
              <div className="card card-body mb-3 bg-light">
                <div className="d-flex justify-content-between my-2">
                  <div>Status:</div>
                  <strong>{order.isDelivered ? "Deivered" : "in Shipping"}</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
