import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { SERVER_URL } from "../utils/serverUtil";
import { parseJwt } from "../utils/tokenDecode";

const Login = () => {
  const [username, setUsername] = useState("guest");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();




  const loginHandle = async (e) => {
    e.preventDefault();
    let result = await axios
      .post(
        SERVER_URL + "/login/loginuser/",
        {
          username: username,
          password: password,
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("user", parseJwt(response.data.access).user_id);
        window.location.href = "/mainboard";
      });
  };

  return (
    <div className="register-form-container">
      <div className="register-info">
        <form onSubmit={loginHandle}>
          <h1>Login</h1>
          <div>
            <label>Username: </label>
            <br />
            <input
              id="username"
              type="text"
              autoComplete={"false"}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password: </label>
            <br />
            <input
              id="password"
              type={"password"}
              autoComplete={"false"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <p>
            Dont have an account? <NavLink to="/register">Register</NavLink>
          </p>
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
