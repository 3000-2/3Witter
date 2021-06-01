import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
