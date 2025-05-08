import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import axios from "axios";

const Login = () => {
    const loginAPI = "https://todo-backend-zwg4.onrender.com/login";

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email")
                .required("Email is required"),

            password: Yup.string()
                .min(6, "Password must have at least 6 characters")
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/\d/, "Password must contain at least one number")
                .matches(/[@$!%*?&]/, "Password must contain at least one special character")
                .required("Password is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(loginAPI, values);
                console.log("Full login response:", response.data);
                const token = response.data.result?.token;

                if (token) {
                    sessionStorage.setItem("authToken", token);
                    console.log("Login successful. Token saved to sessionStorage", token);
                } else {
                    console.warn("Token not found inside result:", response.data.result);
                }
                console.log("Login success", response.data);
                resetForm();
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                alert("Invalid email or password");
            }
        },
    });

    return (
        <div className="container">
            <div className="login-section">
                <h1 className="main-heading">Solara</h1>
                <h2>Login</h2>
                <p className="small-text">
                    Don't have an account? <Link to="/signup">Create Now</Link>
                </p>

                <form onSubmit={formik.handleSubmit} noValidate>
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
                            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"
                                } view-icon`}
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

                    <button className="login-btn" type="submit">
                        Login
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
                            src="https://media.istockphoto.com/id/530473027/photo/wallet-cradit-cards-euro.jpg?s=2048x2048&w=is&k=20&c=ipJOy-OeZX5p1apcmfMOKZFpqKKo9l6BgBf_5trNXqA="
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

export default Login;
