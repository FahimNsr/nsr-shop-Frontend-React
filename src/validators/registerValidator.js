import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
        [true],
        "Accept Terms & Conditions is required"
    ),
});

export { registerValidationSchema };
