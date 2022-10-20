import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/mainboard.css";

const MainBoard = () => {
  const [games, setGames] = useState([]);
  const [filterGamesBy, setFilterGamesBy] = useState("");
  const [generes, setGeneres] = useState([]);
  const [currentPage, setCurrentPage] = useState(SERVER_URL)
  const [nextPage, setNextPage] = useState("");
  console.log("first " + currentPage)
  useEffect(() => {
    const server_data = async () => {
      const result = await axios(currentPage);
      console.log(result.data.next);
      setGames(result.data.results);
      setNextPage(result.data.next)
    };

    server_data();
  }, [currentPage]);

  useEffect(() => {
    for (let i = 0; i < games.length; i++) {
      for (let j = 0; j < games[i].genres.length; j++) {
        if (!generes.includes(games[i].genres[j].name)) {
          generes.push(games[i].genres[j].name);
        }
      }
    }
  }, [games]);

  const filterGame = (e) => {
    setFilterGamesBy(e);
  };

  const changeToNextPage = () =>{
    setCurrentPage(nextPage)
    window.scrollTo(0,0)
  }

  return (
    <div className="mainBoardContainer">
      <div className="dropdown">
        <button className="dropbtn">Filter by</button>
        <div className="dropdown-content">
          <a onClick={(e) => filterGame("")}>None</a>
          {generes.map((genre, ind) => (
            <a value={genre} onClick={(e) => filterGame(genre)} key={ind}>
              {genre}
            </a>
          ))}
        </div>
      </div>
      <div className="games-grid">
        {filterGamesBy
          ? games
              .filter((game) => {
                /* return game.genres[0].name === filterGamesBy */
                let countGenres = 0;
                for (let i = 0; i < game.genres.length; i++) {
                  if (game.genres[i].name === filterGamesBy) {
                    countGenres++;
                  }
                }
                if (countGenres > 0) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((game, ind) => (
                <NavLink
                  key={ind}
                  to={"/game/" + game.id}
                  className="card stacked"
                >
                  <img
                    src={game.background_image}
                    alt=""
                    className="card__img"
                  ></img>
                  <div className="card__content">
                    <h2 className="card__title">{game.name}</h2>
                    <p className="card__price">{Math.floor(Math.random() * 100)}$</p>
                  </div>
                </NavLink>
              ))
          : games.map((game, ind) => (
              <NavLink
                key={ind}
                to={"/game/" + game.id}
                className="card stacked"
              >
                <img
                  src={game.background_image}
                  alt=""
                  className="card__img"
                ></img>
                <div className="card__content">
                  <h2 className="card__title">{game.name}</h2>
                  <p className="card__price">{Math.floor(Math.random() * 100)}$</p>
                </div>
              </NavLink>
            ))}
      </div>
      <button onClick={changeToNextPage}>Next page</button>
    </div>
  );
};

export default MainBoard;
