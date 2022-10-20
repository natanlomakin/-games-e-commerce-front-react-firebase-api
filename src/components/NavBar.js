import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../static/css/navbar.css";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  /* const isAuthenticated = localStorage.getItem("token"); */
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [LoggedInDisplay, setLoggedInDisplay] = useState(null);

  const logoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(null);
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token"));
  }, [isAuthenticated]);

  const displayByLoginStatus = () => {
    if (!isAuthenticated) {
      return (
        <div className="container">
          <nav>
            <h2 className="logo">
              1<span>UP</span>
            </h2>
            <ul>
              <li>
                <NavLink to="/mainboard">Home</NavLink>
              </li>
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Service</NavLink>
              </li>
            </ul>
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  src="https://picsum.photos/seed/picsum/200"
                  className="profilePic"
                  alt="..."
                />
              </button>
              <div className="dropdown-content">
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/cart">Cart</NavLink>
              </div>
            </div>
            {/* <NavLink className="cartButton" to="/cart">
          Cart
        </NavLink> */}
            {/* <button type="button">Cart</button> */}
          </nav>
          <Outlet />
        </div>
      );
    } else {
      return (
        <div className="container">
          <nav>
            <h2 className="logo">
              1<span>UP</span>
            </h2>
            <ul>
              <li>
                <NavLink to="/mainboard">Home</NavLink>
              </li>
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Service</NavLink>
              </li>
            </ul>
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  src="https://picsum.photos/seed/picsum/200"
                  className="profilePic"
                  alt="..."
                />
              </button>
              <div className="dropdown-content">
                <NavLink to="/profile">Profile</NavLink>
                <a onClick={logoutHandle}>Logout</a>
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/cart">Cart</NavLink>
              </div>
            </div>
            {/* <NavLink className="cartButton" to="/cart">
      Cart
    </NavLink> */}
            {/* <button type="button">Cart</button> */}
          </nav>
          <Outlet />
        </div>
      );
    }
  };

  return displayByLoginStatus();
};

export default NavBar;
