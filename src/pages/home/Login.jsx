import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { loginValidationSchema } from "../../validators";
import { userAction } from "../../redux/action";

const Login = ({ history }) => {
    const initialValues = {
        email: "",
        password: "",
    };

    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.authentication);
    const registerStatus = useSelector((state) => state.registration);

    // reset login status
    useEffect(() => {
        dispatch(userAction.logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // redirect to home page when logged successfully
    useEffect(() => {
        if (authStatus.status) {
            history.replace("/");
        }
    }, [authStatus.status, history]);

    function onSubmit({ email, password }) {
        if (email && password) {
            dispatch(userAction.login(email, password));
        }
    }
    return (
        <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center ">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black">
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                                {registerStatus.status ? (
                                                    <h5 className="card-header bg-success bg-gradient text-light bg-opacity-75 rounded text-center ms-4 m-3 me-2">
                                                        Registration successful
                                                    </h5>
                                                ) : null}
                                                {authStatus.error ? (
                                                    <h6 className="card-header bg-danger text-light bg-opacity-75 rounded text-center ms-4 m-3 me-2">
                                                        {authStatus.error}
                                                    </h6>
                                                ) : null}
                                                <div className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label">Your Email</label>
                                                            <Field
                                                                name="email"
                                                                type="text"
                                                                autoComplete="true"
                                                                className={
                                                                    "form-control" + (errors.email && touched.email ? " is-invalid" : "")
                                                                }
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
                                                                className={
                                                                    "form-control" +
                                                                    (errors.password && touched.password ? " is-invalid" : "")
                                                                }
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
