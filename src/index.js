import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import AuthService from "./components/service/auth_service";
import Repository from "./components/service/repository";

const authService = new AuthService();
const repository = new Repository();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} repository={repository} />
  </React.StrictMode>,
  document.getElementById("root")
);
