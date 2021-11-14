import React, { useEffect } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const MyOrders = (props) => {
  let { pathname } = useLocation();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="mx-3">
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <div className="d-flex justify-content-between m-3">
        <Link
          className={"col p-2 m-3 btn text-light " + (pathname === "/profile" ? " bg-dark" : " bg-secondary")}
          to="/profile"
        >
          Personal Details
        </Link>
        <Link
          className={
            "col p-2 m-3 btn text-light " + (pathname.substring(0, 9) === "/myorders" ? " bg-dark" : " bg-secondary")
          }
          to="/myorders"
        >
          My Orders
        </Link>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length ? (
        <table className="table table-success table-striped table-hover mt-3 text-center">
          <thead>
            <tr>
              <th className="h6">ID</th>
              <th className="h6">DATE</th>
              <th className="h6">TOTAL</th>
              <th className="h6">DELIVERED</th>
              <th className="h6">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm opacity-75 btn-primary"
                    onClick={() => {
                      props.history.push(`/myorders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="h6">ID</th>
              <th className="h6">DATE</th>
              <th className="h6">TOTAL</th>
              <th className="h6">DELIVERED</th>
              <th className="h6">ACTIONS</th>
            </tr>
          </tfoot>
        </table>
      ) : (
        <h3 className=" text-center">No Orders Founded</h3>
      )}
    </div>
  );
};
export default withRouter(MyOrders);
