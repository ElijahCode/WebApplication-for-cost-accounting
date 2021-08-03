import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import firebase from "firebase";
import { App } from "./tsx/app/app";
import { reducer } from "./ts/reducer/reducer";

ReactDOM.render(<App />, document.querySelector(".root"));
