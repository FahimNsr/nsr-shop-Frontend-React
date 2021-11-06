import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const Register = (props) => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };
  const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  });

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  function onSubmit(user) {
    if (user.email && user.password && user.confirmPassword && user.acceptTerms) {
      dispatch(register(user.email, user.password));
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form>
                      <Helmet>
        <title>Register</title>
      </Helmet>

          <div className="container">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
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
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Repeat your password</label>
                              <Field
                                name="confirmPassword"
                                type="password"
                                autoComplete="true"
                                className={
                                  "form-control" +
                                  (errors.confirmPassword && touched.confirmPassword ? " is-invalid" : "")
                                }
                              />
                              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="form-group form-check m-4">
                            <Field
                              type="checkbox"
                              name="acceptTerms"
                              id="acceptTerms"
                              className={
                                "form-check-input" + (errors.acceptTerms && touched.acceptTerms ? " is-invalid" : "")
                              }
                            />
                            <label htmlFor="acceptTerms" className="form-check-label">
                              Accept <Link to="#"> Terms & Conditions</Link>
                            </label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                          className="img-fluid"
                          alt="register img"
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

export default Register;
