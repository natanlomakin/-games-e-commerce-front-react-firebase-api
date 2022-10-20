import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainBoard from "./components/MainBoard";
import Game from "./components/Game";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/register" AuthContext element={<Register />}></Route>
          <Route path="/login" AuthContext element={<Login />}></Route>
          <Route path="/mainboard" element={<MainBoard />}></Route>
          <Route path="/game/:id" element={<Game />}></Route>
          <Route path="/cart" AuthContext element={<Cart/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
