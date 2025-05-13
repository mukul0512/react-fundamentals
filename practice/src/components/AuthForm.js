import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";

const AuthForm = ({ type }) => {
    const isLogin = type === "login";
    const navigate = useNavigate();
    const apiURL = isLogin
        ? "https://todo-backend-zwg4.onrender.com/login"
        : "https://todo-backend-zwg4.onrender.com/signup";

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            ...(isLogin
                ? {}
                : {
                    name: Yup.string()
                        .min(3, "Name must be at least 3 characters")
                        .required("Name is required"),
                }),
            email: Yup.string()
                .email("Enter a valid email")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must have at least 6 characters")
                .matches(/[a-z]/, "At least one lowercase letter")
                .matches(/[A-Z]/, "At least one uppercase letter")
                .matches(/\d/, "At least one number")
                .matches(/[@$!%*?&]/, "At least one special character")
                .required("Password is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = isLogin
                    ? { email: values.email, password: values.password }
                    : values;
                const response = await axios.post(apiURL, payload);
                const token = isLogin
                    ? response.data.updatedUser.token
                    : response.data.result?.token;

                if (token) {
                    sessionStorage.setItem("authToken", token);
                    navigate(isLogin ? "/home" : "/");
                }
                resetForm();
            } catch (error) {
                console.error("Auth failed:", error.response?.data || error.message);
            }
        },
    });

    return (
        <div className="container">
            <div className={`${isLogin ? "login-section" : "signup-section"}`}>
                <h1 className="main-heading">Solara</h1>
                <h2>{isLogin ? "Login" : "Signup"}</h2>
                <p className="small-text">
                    {isLogin ? (
                        <>Don't have an account? <Link to="/signup">Create Now</Link></>
                    ) : (
                        <>Already have an account? <Link to="/">Login here</Link></>
                    )}
                </p>

                <form onSubmit={formik.handleSubmit} noValidate>
                    {!isLogin && (
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                {...formik.getFieldProps("name")}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="input-error">{formik.errors.name}</div>
                            )}
                        </>
                    )}

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="input-error">{formik.errors.email}</div>
                    )}

                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="@#*%"
                            {...formik.getFieldProps("password")}
                        />
                        <i
                            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} view-icon`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="input-error">{formik.errors.password}</div>
                    )}

                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>

                    <button className={`${isLogin ? "login-btn" : "signup-btn"}`} type="submit">
                        {isLogin ? "Login" : "Signup"}
                    </button>

                    <div className="divider-with-text">
                        <span>or</span>
                    </div>

                    <button className="social-button google">
                        <FaGoogle className="icon" />
                        <span>Continue with Google</span>
                    </button>

                    <button className="social-button facebook">
                        <FaFacebookF className="icon" />
                        <span>Continue with Facebook</span>
                    </button>
                </form>
            </div>

            <div className="support-section">
                <h1 className="support-heading">Support</h1>
                <div className="support-content">
                    <h2>Reach financial Goals faster</h2>
                    <p>
                        Use your Venus card around the world with no hidden fees. Hold,
                        transfer and spend money.
                    </p>
                    <button className="learn-more">Learn more</button>
                    <div className="card-image">
                        <img
                            src="../Images/Card 2.png"
                            alt="cardImg"
                        />
                    </div>
                    <div className="earnings-box">
                        <h3>Earnings</h3>
                        <p>$350.40</p>
                    </div>
                </div>
                <div className="features-section">
                    <h1>Introducing new features</h1>
                    <p>
                        Analyzing previous trends ensures that businesses always make the
                        right decision. And as the scale of the decision and its impact
                        magnifies...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
