import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";

function App({ authService, repository }) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup authService={authService} repository={repository} />
          </Route>
          <Route exact path="/home">
            <Home authService={authService} repository={repository} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
