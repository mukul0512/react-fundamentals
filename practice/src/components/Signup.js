import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Signup Success:", values);
      resetForm();
    },
  });

  return (
    <div className="container">
      <div className="signup-section">
        <h1 className="main-heading">Solara</h1>
        <h2>Signup</h2>
        <p className="small-text">
          Already have an account? <Link to="/">Login here</Link>
        </p>

        <form onSubmit={formik.handleSubmit} noValidate>
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
              className={`fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
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

          <button className="signup-btn" type="submit">
            Signup
          </button>

          <div className="or-divider">
            -------------------------------------------------------------------or------------------------------------------------------
          </div>

          <button className="social-btn google">
            <i className="fab fa-google"></i> Continue with Google
          </button>
          <button className="social-btn facebook">
            <i className="fab fa-facebook"></i> Continue with Facebook
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

export default Signup;
