// import React, { useState } from "react";

// const Practice = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const emailChangeHandler = (event) => {
//         setEmail(event.target.value);
//     };
//     const passwordChangeHandler = (event) => {
//         setPassword(event.target.value);
//     };
//     const submitHandler = (event) => {
//         event.preventDefault();
//         if (email.length === 0 || password.length === 0) {
//             alert("All fields must be filled");
//             return;
//         }
//         const dataToSend = {
//             email,
//             password,
//         };
//         console.log("Form Data :", dataToSend);
//     };
//     console.log("email :", email);
//     console.log("password :", password);
//     return (
//         <div style={{ width: "100%", height: "100vh" }}>
//             <h1 style={{ textAlign: "center" }}>Login Form</h1>
//             <form className="practice--form" onSubmit={submitHandler}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={emailChangeHandler}
//                     className="input-field"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={passwordChangeHandler}
//                     className="input-field"
//                 />
//                 <button type="submit" className="input-field">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Practice;

// --------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";

// const Practice = () => {
//     const [loginForm, setLoginForm] = useState({
//         email: "",
//         password: "",
//         name: "",
//     });

//     const formHandler = (e) => {
//         const { name, value } = e.target;
//         setLoginForm((prev) => ({ ...prev, [name]: value }));
//     };
//     const submitHandler = (event) => {
//         event.preventDefault();
//         /***
//          * add validation
//          */
//         console.log(loginForm);
//     };
//     return (
//         <div style={{ width: "100%", height: "100vh" }}>
//             <h1 style={{ textAlign: "center" }}>Login Form</h1>
//             <form className="practice--form" onSubmit={submitHandler}>
//                 <label htmlFor="name">Name</label>
//                 <input
//                     name="name"
//                     type="text"
//                     placeholder="Name"
//                     value={loginForm.name}
//                     onChange={formHandler}
//                     className="input-field"
//                 />
//                 <label htmlFor="email">Email</label>
//                 <input
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     value={loginForm.email}
//                     onChange={formHandler}
//                     className="input-field"
//                 />
//                 <label htmlFor="email">Email</label>
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     value={loginForm.password}
//                     onChange={formHandler}
//                     className="input-field"
//                 />
//                 <button type="submit" className="input-field">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Practice;

import React, { useState } from "react";

const Practice = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const formHandler = (e) => {
        const { name, value } = e.target;
        const datToSave = { ...loginForm, [name]: value };
        setLoginForm(datToSave);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        /***
         * add validation
         */
        console.log(loginForm);
    };
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <h1 style={{ textAlign: "center" }}>Login Form</h1>
            <form className="practice--form" onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={loginForm.name}
                    onChange={formHandler}
                    className="input-field"
                />
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={formHandler}
                    className="input-field"
                />
                <label htmlFor="email">Email</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={formHandler}
                    className="input-field"
                />
                <button type="submit" className="input-field">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Practice;