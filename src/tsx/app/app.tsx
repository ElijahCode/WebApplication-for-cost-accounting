import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import firebase from "firebase";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { firebaseConfig } from "../../fireBaseConfig";
import { About } from "../about/about";
import { Login } from "../login/login";
import { MainWithOutLogin } from "../main/mainWithOutLogin";
import { CostTable } from "../costTable/costTable";
import { CategoryTable } from "../categoryTable/categoryTable";
import { ChartBlock } from "../chart/chart";
import { StateSetter } from "../stateSetter/stateSetter";
import { reducer } from "../../ts/reducer/reducer";

const preloadedState: IState = {
  user: "",
  categoriesOfCost: [],
};

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(async () => {
  const { user, categoriesOfCost } = store.getState();
  const dataBase = firebase.database();
  if (categoriesOfCost.length !== 0) {
    await dataBase.ref(`users/${user}`).set(JSON.stringify(categoriesOfCost));
  }
});

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
          <Provider store={store}>
            <BrowserRouter>
              {" "}
              <div className="NavBlock">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <IfFirebaseUnAuthed>
                  {() => <Link to="/login">Log in</Link>}
                </IfFirebaseUnAuthed>
                <IfFirebaseAuthed>
                  {() => (
                    <>
                      <StateSetter />
                      <Link to="/costTable">Costs Table</Link>
                      <Link to="/categoryTable">Categories Table</Link>
                      <Link to="/chart">Chart</Link>
                      <Link to="/" onClick={() => firebase.auth().signOut()}>
                        Log out
                      </Link>
                    </>
                  )}
                </IfFirebaseAuthed>
              </div>
              <Switch>
                <Route exact path="/">
                  <MainWithOutLogin />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/costTable">
                  <CostTable />
                </Route>
                <Route path="/cost_table_for_last_week">
                  <CostTable />
                </Route>
                <Route path="/cost_table_all">
                  <CostTable />
                </Route>
                <Route path="/cost_table_for last month">
                  <CostTable />
                </Route>
                <Route path="/cost_table_variable_date">
                  <CostTable />
                </Route>
                <Route path="/categoryTable">
                  <CategoryTable />
                </Route>
                <Route path="/chart">
                  <ChartBlock />
                </Route>
                <Route path="/chart_all">
                  <ChartBlock />
                </Route>
                <Route path="/chart_for_day">
                  <ChartBlock />
                </Route>
                <Route path="/chart_for_last_week">
                  <ChartBlock />
                </Route>
                <Route path="/chart_for_last_month">
                  <ChartBlock />
                </Route>
                <Route path={"/chart_variable_date"}>
                  <ChartBlock />
                </Route>
              </Switch>
            </BrowserRouter>
          </Provider>
        </FirebaseDatabaseProvider>
      </FirebaseAuthProvider>
    );
  }
}
