import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function Profile(props) {
  let { pathname } = useLocation();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || successUpdate) {
      dispatch(detailsUser(userInfo._id));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, successUpdate, user, userInfo._id]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      // dispatch update profile
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <Link
          className={"col p-2 m-3 btn text-light " + (pathname === "/profile" ? " bg-dark" : "bg-secondary")}
          to="/profile"
        >
          Personal Details
        </Link>
        <Link
          className={"col p-2 m-3 btn text-light " + (pathname === "/myorders" ? " bg-dark" : "bg-secondary")}
          to="/myorders"
        >
          My Orders
        </Link>
      </div>
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-8 col-auto">
          <div className="card text-black">
            <div className="card-body ">
              <div className="justify-content-center">
                <h2 className="text-center fw-bold m-4 ">Update Your Profile</h2>
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>

                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    <Helmet>
                      <title>Profile | {user.name ? user.name : user.email }</title>
                    </Helmet>
                    <form onSubmit={submitHandler}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label">Name</label>
                          <input
                            className={"form-control"}
                            name="name"
                            type="text"
                            required
                            value={name ? name : ""}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="true"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label">Email</label>
                          <input
                            className={"form-control"}
                            name="email"
                            type="text"
                            required
                            value={email ? email : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="true"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label">Password</label>
                          <input
                            name="password"
                            type="password"
                            autoComplete="true"
                            className={"form-control"}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label">Repeat your password</label>
                          <input
                            name="confirmPassword"
                            type="password"
                            autoComplete="true"
                            className={"form-control"}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <button type="submit" className="form-control btn btn-success opacity-75 m-2">
                        Update
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
