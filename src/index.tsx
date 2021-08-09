import React from "react";
import ReactDOM from "react-dom";
import { App } from "./tsx/app/app";
import "../babel.config";
import "bootswatch/dist/darkly/bootstrap.min.css";

ReactDOM.render(<App />, document.querySelector(".root"));
