import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { listUsers } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const UsersList = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {users.map((user) => {
            const { id, name, email, createdAt, isAdmin } = user;
            return (
              <div key={id} className="d-flex flex-row align-items-center text-center justify-content-center mt-4">
                <span className="btn btn-outline-success m-2"> {name ? name : "-----"}</span>
                <span className="btn btn-dark m-2"> {email}</span>
                <span className="btn btn-secondary m-2"> {createdAt}</span>
                <span className="btn btn-outline-success m-2"> {isAdmin ? "True" : "-----"}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default UsersList;
