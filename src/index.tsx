import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import firebase from "firebase";
import { App } from "./tsx/app/app";
import { reducer } from "./ts/reducer/reducer";
import "bootswatch/dist/darkly/bootstrap.min.css";

ReactDOM.render(<App />, document.querySelector(".root"));
