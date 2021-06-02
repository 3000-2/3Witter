import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";

function App({ authService }) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup authService={authService} />
          </Route>
          <Route exact path="/home">
            <Home authService={authService} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
