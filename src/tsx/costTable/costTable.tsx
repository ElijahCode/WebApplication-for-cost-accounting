import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createCostItem } from "../../ts/createCostItem/createCostITem";
import { addCost, deleteCost } from "../../ts/reducer/actions";

interface ICostTableProps {
  costHistory: CostHistoryItem[];
}

interface ICostTableState {
  costHistory: CostHistoryItem[];
  beginDate: number;
  lastDate: number;
  addCostCost: number;
  addCostDate: number;
  addCostCategoryName: string;
  addCostDateInputValue: string;
  renderingCosts: CostHistoryItem[];
}

interface HTMLRawWithKey extends HTMLTableRowElement {
  key: string;
}

class CostTableWithoutStore extends React.Component<any, ICostTableState> {
  state = {
    costHistory: this.setDefaultCostHistoryValues(),
    beginDate: this.setDefaultBeginDate(),
    lastDate: this.setDefaultLastDate(),
    addCostCost: 0,
    addCostDate: Date.now(),
    addCostCategoryName: "",
    addCostDateInputValue: this.setDefaultDateForAddCost(),
    renderingCosts: this.setDefaultCostHistoryValues(),
  };

  private setDefaultBeginDate() {
    const toDay = Date.now();
    const firstDayOfCurrentMonth = new Date(toDay).setDate(1).valueOf();
    return firstDayOfCurrentMonth;
  }

  private setDefaultLastDate() {
    const toDay = new Date(Date.now());
    const nextMonth = new Date(toDay.setMonth(toDay.getMonth() + 1).valueOf());
    const lastDayofCurrentMonth = new Date(nextMonth.setDate(0).valueOf());
    return lastDayofCurrentMonth.valueOf();
  }

  private setDefaultDateForAddCost() {
    const toDayDate = new Date(Date.now());
    const day =
      toDayDate.getDate() > 9
        ? `${toDayDate.getDate()}`
        : `0${toDayDate.getDate()}`;
    const month =
      toDayDate.getMonth() > 9
        ? `${toDayDate.getMonth() + 1}`
        : `0${toDayDate.getMonth() + 1}`;
    const year = toDayDate.getFullYear();
    const hour =
      toDayDate.getHours() > 9
        ? `${toDayDate.getHours()}`
        : `0${toDayDate.getHours()}`;
    const minutes =
      toDayDate.getMinutes() > 9
        ? `${toDayDate.getMinutes()}`
        : `0${toDayDate.getMinutes()}`;
    return `${day}.${month}.${year} ${hour}:${minutes}`;
  }

  setDefaultCostHistoryValues(): CostHistoryItem[] {
    let result: CostHistoryItem[] = [];
    if (this.props.categoriesOfCost !== []) {
      result = this.props.categoriesOfCost.reduce(
        (acc: CostHistoryItem[], curr: IStateCategory) => {
          if (curr.parentID === null) {
            return acc.concat(curr.costHistory);
          }
          return acc;
        },
        []
      );
    }
    return result;
  }

  onAddCostChange = (event: ChangeEvent): void => {
    const newCost = (event.target as HTMLInputElement).value;
    this.setState({
      addCostCost: Number(newCost),
    });
  };

  onAddCostDateChange = (event: ChangeEvent): void => {
    const newDate = (event.target as HTMLInputElement).value;
    const [partDate, time] = newDate.split(" ");
    const normalizedTime = time !== undefined ? time : "00:00";
    const normalizedPartDate = partDate.split(".").reverse().join("-");
    const resultPartDate = [normalizedPartDate, normalizedTime].join("T");
    const resultDate = new Date(Date.parse(resultPartDate)).valueOf();
    this.setState({
      addCostDate: resultDate,
      addCostDateInputValue: newDate,
    });
  };

  onAddCostCategoryNameChange = (event: ChangeEvent): void => {
    const newCostCategoryName = (event.target as HTMLInputElement).value;
    this.setState({
      addCostCategoryName: newCostCategoryName,
    });
  };

  addCostButtonClick = (): void => {
    const newCost: CostHistoryItem = createCostItem(
      this.state.addCostCost,
      this.state.addCostDate
    );
    const categoryID = this.props.categoriesOfCost.find(
      (categ: IStateCategory) => categ.name === this.state.addCostCategoryName
    )?.id;
    if (!categoryID) {
      return;
    }
    const addCostItem: IActionAddCost = {
      costItem: newCost,
      categoryID,
    };
    this.props.addCost(addCostItem);
    const newCostHistory = this.state.costHistory;
    newCostHistory.push(newCost);
    this.setState({
      costHistory: newCostHistory,
      addCostCost: 0,
      addCostDate: Date.now(),
      addCostCategoryName: "",
      addCostDateInputValue: this.setDefaultDateForAddCost(),
      renderingCosts: newCostHistory,
    });
  };

  deleteCostButtonClick = (event: any): void => {
    const target = event.target as HTMLButtonElement;
    const stringTable = target.closest("tr") as HTMLRawWithKey;
    const costId = stringTable.getAttribute("id");
    this.props.deleteCost(
      this.state.costHistory.find((cost: CostHistoryItem) => cost.id === costId)
    );
    const newCostHistory = this.state.costHistory.filter(
      (cost: CostHistoryItem) => cost.id !== costId
    );
    this.setState({
      costHistory: newCostHistory,
      renderingCosts: newCostHistory,
    });
  };

  onAllLinkClick = (): void => {
    this.setState({
      renderingCosts: this.props.categoriesOfCost.reduce(
        (acc: CostHistoryItem[], curr: IStateCategory) => {
          if (curr.parentID === null) {
            return acc.concat(curr.costHistory);
          }
          return acc;
        },
        []
      ),
    });
  };

  onLastWeekLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const weekAgo = todayDate.setDate(todayDate.getDate() - 7).valueOf();
    this.setState({
      renderingCosts: this.state.costHistory.filter(
        (costItem: CostHistoryItem) => costItem.date >= weekAgo
      ),
    });
  };

  onLastMonthLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const monthAgo = todayDate.setMonth(todayDate.getMonth() - 1).valueOf();
    this.setState({
      renderingCosts: this.state.costHistory.filter(
        (costItem: CostHistoryItem) => costItem.date >= monthAgo
      ),
    });
  };

  onLastYearLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const yearAgo = todayDate
      .setFullYear(todayDate.getFullYear() - 1)
      .valueOf();
    this.setState({
      renderingCosts: this.state.costHistory.filter(
        (costItem: CostHistoryItem) => costItem.date >= yearAgo
      ),
    });
  };

  render(): JSX.Element {
    const layout = (
      <div data-testid="CostTableBlock">
        <div data-testid="DateBlock">
          <p data-testid="ShowCostParag">Show cost</p>
          <Link
            onClick={this.onAllLinkClick}
            to="/cost_table_all"
            data-testid="AllLink"
          >
            All
          </Link>
          <Link
            onClick={this.onLastWeekLinkClick}
            to="/cost_table_for_last_week"
            data-testid="WeekLink"
          >
            For last week
          </Link>
          <Link
            onClick={this.onLastMonthLinkClick}
            to="/cost_table_for last month"
            data-testid="MonthLink"
          >
            For last month
          </Link>
          <Link
            onClick={this.onLastYearLinkClick}
            to="/cost_table_for_last_year"
            data-testid="YearLink"
          >
            For last year
          </Link>
        </div>
        <div data-testid="addCostBlock">
          <p data-testid="addCostParag">Cost:</p>
          <input
            type="text"
            value={`${this.state.addCostCost}`}
            onChange={this.onAddCostChange}
            data-testid="addCostInput"
          />
          <p data-testid="addCostDateParag">Date:</p>
          <input
            type="text"
            value={this.state.addCostDateInputValue}
            onChange={this.onAddCostDateChange}
            className={"addCost_DateInput"}
            data-testid="AddCostDateInput"
          />{" "}
          <p data-testid="addCostCategoryNameParag">CategoryName:</p>
          <input
            type="text"
            value={this.state.addCostCategoryName}
            onChange={this.onAddCostCategoryNameChange}
            data-testid="addCostCategoryNameInput"
          />{" "}
          <button onClick={this.addCostButtonClick} data-testid="AddCostButton">
            Add task
          </button>
        </div>
        {this.state.renderingCosts !== [] && (
          <table data-testid="CostTable">
            <tbody>
              {this.state.renderingCosts.map((costItem: CostHistoryItem) => {
                const costDate = new Date(costItem.date);
                const costDateMinutes =
                  costDate.getMinutes() > 9
                    ? costDate.getMinutes()
                    : `0${costDate.getMinutes()}`;
                const costDateHours =
                  costDate.getHours() > 9
                    ? costDate.getHours()
                    : `0${costDate.getHours()}`;
                const costDateDay =
                  costDate.getDate() > 9
                    ? costDate.getDate()
                    : `0${costDate.getDate()}`;
                const costDateMonth =
                  costDate.getMonth() > 9
                    ? costDate.getMonth()
                    : `0${costDate.getMonth()}`;
                const renderCostDate = `${costDateDay}.${costDateMonth}.${costDate.getFullYear()} ${costDateHours}:${costDateMinutes}`;
                return (
                  <tr
                    id={costItem.id}
                    key={costItem.id}
                    data-testid="tableString"
                  >
                    <td data-testid="costName">{costItem.cost}</td>
                    <td data-testid="costDate">{renderCostDate}</td>
                    <td>
                      <button data-testid="buttonChagneCost">
                        Change cost
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={this.deleteCostButtonClick}
                        data-testid="buttonDeleteCost"
                      >
                        Delete cost
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
    return layout;
  }
}

const mapStateToProps = (state: IState) => ({
  categoriesOfCost: state.categoriesOfCost,
});
const mapDispatchToProps = {
  addCost,
  deleteCost,
};

export const CostTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CostTableWithoutStore);
