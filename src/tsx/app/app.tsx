import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { About } from "../about/about";
import { Login } from "../login/login";
import { Registration } from "../registration/registration";
import { MainWithOutLogin } from "../main/mainWithOutLogin";
import { CostTable } from "../costTable/costTable";
import { CategoryTable } from "../categoryTable/categoryTable";
import { ChartBlock } from "../chart/chart";

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <BrowserRouter>
        {" "}
        <div className="NavBlock">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
          <Link to="/registration">Registration</Link>
          <Link to="/costTable">Costs Table</Link>
          <Link to="/categoryTable">Categories Table</Link>
          <Link to="/chart">Chart</Link>
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
          <Route path="/registration">
            <Registration />
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
          <Route path="/cost_table_for_last_year">
            <CostTable />
          </Route>
          <Route path="/categoryTable">
            <CategoryTable />
          </Route>
          <Route path="/chart">
            <ChartBlock />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
