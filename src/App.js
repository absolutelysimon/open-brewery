import logo from "./beer.png";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";

import { Brewery } from "./components";
import { City } from "./pages/City";

//Mob programming test!

function App() {
  let [data, setData] = useState();
  let [breweryId, setId] = useState(
    Math.floor(Math.random() * (17000 - 8000) + 8000)
  );
  debugger;
  useEffect(() => {
    async function getData() {
      try {
        const results = await axios.get(
          "https://api.openbrewerydb.org/breweries/" + breweryId
        );
        console.log("Success: " + breweryId);
        setData(results.data);
      } catch (err) {
        console.log("Error: " + breweryId);
        setId(Math.floor(Math.random() * (17000 - 8000) + 8000));
      }
    }
    getData();
  }, [breweryId]);

  return data ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Simon's Super Cool Brewery Website</h1>
        <Link to="city">City</Link>
      </header>
      <body>
        <Router>
          <RandomBrewery path="/" />
          <City path="/city" />
          <Brewery info={data} />
          <button
            onClick={() =>
              setId(Math.floor(Math.random() * (17000 - 8000) + 8000))
            }
          >
            New Brewery
          </button>
        </Router>
      </body>
    </div>
  ) : (
    "Loading..."
  );
}

export default App;
