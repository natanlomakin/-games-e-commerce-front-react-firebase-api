import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/game.css";

const Game = () => {
  const [game, setGame] = useState();
  const { id } = useParams();
  const [feturedImage, setFeturedImage] = useState("");
  const [cartButtonContent, setCartButtonContent] = useState("Add to cart");
  const [cartButtonState, setcartButtonState] = useState("game-cart-button");
  const [wishlistButtonContent, setWishlistButtonContent] =
    useState("Add to wishlist");
  const [wishlistButtonState, setWishlistButtonState] = useState(
    "game-wishlist-button"
  );
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gamedevelopers, setGamedevelopers] = useState([]);
  const [gamePublishers, setGamePublishers] = useState([]);
  const [gamePlatforms, setGamePlatforms] = useState([]);
  const [gameSpecs, setGameSpecs] = useState([]);
  const [gameTrailer, setGameTrailer] = useState("")

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(
        "https://api.rawg.io/api/games/" +
          id +
          "?key=1da59c710367487d9ce3e3a9c555b113"
      );
      const videoData = await axios(
        "https://api.rawg.io/api/games/" +
          id +
          "/movies" +
          "?key=1da59c710367487d9ce3e3a9c555b113"
      );
      console.log(result);
      setGame(result.data);
      setGameName(result.data.name);
      setFeturedImage(result.data.background_image);
      setGameDescription(result.data.description_raw);
      setGamedevelopers(result.data.developers);
      setGamePublishers(result.data.publishers);
      setGamePlatforms(result.data.platforms);
      setGameSpecs(result.data.platforms[0].requirements.minimum);
      /* setGameTrailer(videoData.data.results[0].data.max) */
      console.log(videoData)
    };
    server_data();
    
  }, []);

  const isGameInCart = async () => {
    const result = await axios(SERVER_URL + "/cart/getusercartgames/", {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    console.log(result.data);
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].game === game._id) {
        console.log("Game allredy in cart");
        setCartButtonContent("Game allredy in cart");
        setcartButtonState("game-cart-button-block");
        return;
      }
    }
    console.log("test");
    addGameToCart();
  };

  const addGameToCart = async () => {
    console.log("Bearer " + localStorage.getItem("token"));
    const result = await axios.post(
      SERVER_URL + "/cart/addgametousercart/",
      {
        user: localStorage.getItem("user"),
        game: String(game.id),
      },
      {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
  };

  const isGameInWishlist = async () => {
    const result = await axios(SERVER_URL + "/wishlist/getuserwishlist/", {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    console.log(result.data[0].game);
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].game === game.id) {
        console.log("Game allredy in wishlist");
        setWishlistButtonContent("Game allredy in wishlist");
        setWishlistButtonState("game-wishlist-button-block");
        return;
      }
    }
    console.log("test");
    addGameToWishlist();
  };

  const addGameToWishlist = async (e) => {
    console.log("Bearer " + localStorage.getItem("token"));
    const result = await axios.post(
      SERVER_URL + "/wishlist/addtouserwishlist/",
      {
        user: localStorage.getItem("user"),
        game: String(game._id),
      },
      {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
  };

  return (
    <div className="game-container">
      <div className="game-images">
        {/* <video className="game-feature-image" src={gameTrailer} controls></video> */}
        <img className="game-feature-image" src={feturedImage} alt=""></img>
        <div className="game-caruosel"></div>
        <div className="game-specs">
          <h2>Specifications</h2>

          <p>{gameSpecs}</p>
        </div>
      </div>
      <div className="game-information">
        <div className="game-details">
          <h1>{gameName}</h1>
          <h3>
            {/* {game.price} */}
            <i className="material-icons">attach_money</i>
          </h3>
          <p>{gameDescription}</p>
          <h4>
            <span>Devloper</span> :
            {gamedevelopers.map((developer, ind) => (
              <h4 key={ind}>{developer.name}</h4>
            ))}
          </h4>
          <h4>
            <span>Publisher</span> :
            {gamePublishers.map((publisher, ind) => (
              <h4 key={ind}>{publisher.name}</h4>
            ))}
          </h4>
          <h4>
            <span>Platform</span> :
            {gamePlatforms.map((platform, ind) => (
              <h4 key={ind}>{platform.platform.name}</h4>
            ))}
          </h4>
          <div>
            <button className={cartButtonState} onClick={isGameInCart}>
              {cartButtonContent}
              {/* <i className="material-icons">add</i> */}
            </button>
            <button className={wishlistButtonState} onClick={isGameInWishlist}>
              {wishlistButtonContent}{" "}
              {/* <i className="material-icons">add</i> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
