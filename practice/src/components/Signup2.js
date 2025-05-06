import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../index.css";

const Signup2 = () => {
    console.log("Signup component rendered");
    const [showPassword, setShowPassword] = useState(false);
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const [errors, setErrors] = useState({});

    const formHandler = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`);
        setSignupForm({ ...signupForm, [name]: value });
    };

    const validate = () => {
        console.log("Running validation...");
        const newErrors = {};
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!signupForm.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!signupForm.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(signupForm.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!signupForm.password) {
            newErrors.password = "Password is required";
        }
        console.log("Validation Errors:", newErrors);
        return newErrors;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            console.log("Form has errors, not submitting");
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        console.log("signup Success:", signupForm);
    };

    return (
        <div className="container">
            <div className="signup-section">
                <h1 className="main-heading">Solara</h1>
                <h2>Signup</h2>
                <p className="small-text">
                    Already have an account? <Link to="/">Login here</Link>
                </p>

                <form onSubmit={submitHandler} noValidate>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={signupForm.name}
                        onChange={formHandler}
                        placeholder="Enter your name"
                        id="name"
                    />
                    {errors.name && <div className="input-error">{errors.name}</div>}

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={signupForm.email}
                        onChange={formHandler}
                        placeholder="example@gmail.com"
                        id="email"
                    />
                    {errors.email && <div className="input-error">{errors.email}</div>}

                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={signupForm.password}
                            onChange={formHandler}
                            placeholder="@#*%"
                            id="password"
                        />
                        <i
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} view-icon`}
                            onClick={() => {
                                console.log("Toggle showPassword");
                                setShowPassword(!showPassword);
                            }}
                        ></i>
                    </div>
                    {errors.password && <div className="input-error">{errors.password}</div>}

                    <div className="options">
                        <label><input type="checkbox" /> Remember me</label>
                    </div>

                    <button className="signup-btn" type="submit">Signup</button>

                    <div className="or-divider">-----------------------------or-----------------------------</div>

                    <button className="social-btn google"><i className="fab fa-google"></i> Continue with Google</button>
                    <button className="social-btn facebook"><i className="fab fa-facebook"></i> Continue with Facebook</button>
                </form>
            </div>

            <div className="support-section">
                <h1 className="support-heading">Support</h1>
                <div className="support-content">
                    <h2>Reach financial Goals faster</h2>
                    <p>
                        Use your Venus card around the world with no hidden fees.
                        Hold, transfer and spend money.
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
                        Analyzing previous trends ensures that businesses always make the right decision.
                        And as the scale of the decision and its impact magnifies...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup2;
