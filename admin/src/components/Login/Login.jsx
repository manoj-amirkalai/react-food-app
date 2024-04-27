import React from "react";
import { useState } from "react";
import "./Login.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ url, setShowLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  const logggedIn = () => {
    if (data.email === "manojfoodapp@gmail.com" && data.password === "987654321") {
      setShowLogin(true);
      navigate("/orders");
      toast.success("Welcome Back BOSS");
    } else {
      toast.error("Invalid Email or Password");
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={logggedIn} className="login-popup-container">
        <p>Admin's Login</p>
        <div className="login-popup-inputs">
          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Log in</button>{" "}
        <p className="userlogin">
          For user's login page please
          <span>
            {" "}
            <a href="https://manoj-food-app-frontend.onrender.com">
              Click here
            </a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
