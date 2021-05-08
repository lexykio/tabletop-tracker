import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/index";
import Home from "./scenes/Home";
import GamePage from "./scenes/GamePage";
import PageNotFound from "./scenes/404/index";
import PopularGames from "./storedData/popularGames";
import "./App.scss";
import axios from "axios";
require("dotenv").config();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/searchedGames`, {
        params: { searchValue: searchValue },
      })
      .then(async (games) => {
        console.log(games.data);
        await setGames(games.data);
        await setSearchValue("");
      });
  };

  return (
    <Router>
      <div className="main-container">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchSubmit={handleSearchSubmit}
          setGames={setGames}
          setGame={setGame}
        />
        <main className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  games={games}
                  setGames={setGames}
                  PopularGames={PopularGames}
                />
              )}
            />
            <Route
              path="/game/:id"
              exact
              render={(props) => (
                <GamePage {...props} game={game} setGame={setGame} />
              )}
            />
            <Route path="/*" component={PageNotFound} exact />
          </Switch>
        </main>
        <footer>
          <div>
            <p>
              Built using the{" "}
              <a href="https://www.boardgameatlas.com/">Board Game Atlas</a> API
            </p>
            <p>
              <a href="https://github.com/lexykio/tabletop-tracker">
                <i class="fab fa-github"></i>
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
