import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/cart.css";
import { title } from "process";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartGameDetails, setCartGameDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    setTotalPrice(0.0);
    const cartData = async () => {
      const resultCart = await axios(SERVER_URL + "/cart/getusercartgames/", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setCartDetails(resultCart.data);
    };
    cartData();
  }, []);

  useEffect(() => {
    const resultGame = [];
    const gameData = async () => {
      for (let i = 0; i < cartDetails.length; i++) {
        resultGame.push(
          (await axios(SERVER_URL + "/game/singlegame/" + cartDetails[i].game))
            .data
        );
        setTotalPrice(totalPrice + Number(resultGame[i].price));
      }
      setCartGameDetails(resultGame);
    };

    gameData();
  }, [cartDetails]);

  return (
    <div className="cart-container">
      <div className="cart-game">
        {cartGameDetails.map((gameDetails, ind) => (
          <div key={ind} className="cart-game-card">
            <img
              className="cart-game-image"
              src={SERVER_URL + gameDetails.imageOne}
            ></img>
            <div className="cart-game-information">
              <div className="cart-game-title">{gameDetails.title}</div>
              <div className="cart-game-price">{gameDetails.price}</div>
              <button>Remove from cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-order-information">Total:{totalPrice}</div>
    </div>
  );
};

export default Cart;
