import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { registerValidationSchema } from "../../validators";
import { userAction } from "../../redux/action";

const Register = ({ history }) => {
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    };
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.registration);

    // reset login status
    // useEffect(() => {
    //     dispatch(userAction.logout());
    // }, []);

    // redirect to login when registered successfully
    useEffect(() => {
        if (status) {
            history.push("./login");
        }
    }, [history, status]);

    function onSubmit(user) {
        if (user.email && user.password && user.confirmPassword && user.acceptTerms) {
            dispatch(userAction.register(user));
        }
    }
    return (
        <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center ">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black">
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                                                {error ? (
                                                    <h6 className="card-header bg-danger text-light bg-opacity-75 rounded text-center ms-4 m-3 me-2">
                                                        {error}
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
                                                            <ErrorMessage
                                                                name="confirmPassword"
                                                                component="div"
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-check m-4">
                                                        <Field
                                                            type="checkbox"
                                                            name="acceptTerms"
                                                            id="acceptTerms"
                                                            className={
                                                                "form-check-input" +
                                                                (errors.acceptTerms && touched.acceptTerms ? " is-invalid" : "")
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
