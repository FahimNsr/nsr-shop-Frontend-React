import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { login } from "../../actions/userActions";

const Login = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  function onSubmit({ email, password }) {
    if (email && password) {
      dispatch(login(email, password));
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form>
                      <Helmet>
        <title>Login</title>
      </Helmet>

          <div className="container">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                        <div className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Your Email</label>
                              <Field
                                name="email"
                                type="text"
                                autoComplete="true"
                                className={"form-control" + (errors.email && touched.email ? " is-invalid" : "")}
                              />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Password</label>
                              <Field
                                name="password"
                                type="password"
                                autoComplete="true"
                                className={"form-control" + (errors.password && touched.password ? " is-invalid" : "")}
                              />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                          className="img-fluid"
                          alt="Login img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
