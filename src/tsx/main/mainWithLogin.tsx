import React from "react";
import { Link } from "react-router-dom";

export function MainWithLogin(): JSX.Element {
  const layout = (
    <>
      <p>Welcome to cost application page</p>
      <p>
        Go to <Link to="/costTable">Costs table</Link> for adding new cost
      </p>
      <p>
        Go to <Link to="/categoryTable">Categories table</Link> for adding new,
        changind or deleting old categories and subcategories
      </p>
      <p>
        Go to <Link to="/chart">Chart</Link> and watch information about your
        costs on pie chart
      </p>
    </>
  );
  return layout;
}
