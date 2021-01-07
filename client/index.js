import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const browserHistory = require("history").createBrowserHistory();

ReactDOM.render(
      <BrowserRouter browserHistory={browserHistory}>
            <Root />
      </BrowserRouter>,
      document.getElementById("root")
);
