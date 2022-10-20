import React, { useState } from "react";
import "../static/css/register.css";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("guest");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerHandle = async () => {
    const response = await axios.post(SERVER_URL + "/register/register/", {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    return response;
  };

  return (
    <div className="register-form-container">
      <div className="register-info">
        <form onSubmit={registerHandle}>
          <h1>Register</h1>
          <div>
            <label>First name: </label>
            <br />
            <input
              id="first_name"
              autoComplete={"false"}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Last name: </label>
            <br />
            <input
              id="last_name"
              type="text"
              autoComplete={"false"}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
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
            <label>Email: </label>
            <br />
            <input
              id="email"
              type={"email"}
              autoComplete={"false"}
              onChange={(e) => setEmail(e.target.value)}
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
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
          <button type="submit">Sign me up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
