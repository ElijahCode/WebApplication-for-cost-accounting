import React from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import Chart from "react-google-charts";

const mapStateToProps = (state: IState) => ({
  categoriesOfCost: state.categoriesOfCost,
});

const ChartBlockConnector = connect(mapStateToProps);

type IChartBlockProps = ConnectedProps<typeof ChartBlockConnector>;

type ChartData = [string, string | number];

interface IChartBlockState {
  categories: IStateCategory[];
  chartData: ChartData[];
  showCostsBeginDate: number;
  showCostsEndDate: number;
}

class ChartBlockWithoutStore extends React.Component<
  IChartBlockProps,
  IChartBlockState
> {
  state = {
    categories: this.props.categoriesOfCost,
    chartData: this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItem: ChartData = [category.name, category.cost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    ),
    showCostsBeginDate: 0,
    showCostsEndDate: 0,
  };

  onAllLinkClick = (): void => {
    const newChartData = this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItem: ChartData = [category.name, category.cost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    );
    this.setState({
      chartData: newChartData,
    });
  };

  onLastWeekLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const weekAgo = todayDate.setDate(todayDate.getDate() - 7).valueOf();
    const newChartData = this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItemCost = category.costHistory.reduce(
            (totalCost: number, costItem: CostHistoryItem) => {
              if (costItem.date >= weekAgo) {
                return totalCost + costItem.cost;
              }
              return totalCost;
            },
            0
          );
          const newItem: ChartData = [category.name, newItemCost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    );
    this.setState({
      chartData: newChartData,
    });
  };

  onLastMonthLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const monthAgo = todayDate.setMonth(todayDate.getMonth() - 1).valueOf();
    const newChartData = this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItemCost = category.costHistory.reduce(
            (totalCost: number, costItem: CostHistoryItem) => {
              if (costItem.date >= monthAgo) {
                return totalCost + costItem.cost;
              }
              return totalCost;
            },
            0
          );
          const newItem: ChartData = [category.name, newItemCost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    );
    this.setState({
      chartData: newChartData,
    });
  };

  onDayLinkClick = (): void => {
    const todayDate = new Date(Date.now());
    const toDayBegin = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    ).valueOf();
    const toDayEnd = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + 1
    ).valueOf();
    const newChartData = this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItemCost = category.costHistory.reduce(
            (totalCost: number, costItem: CostHistoryItem) => {
              if (costItem.date >= toDayBegin && costItem.date <= toDayEnd) {
                return totalCost + costItem.cost;
              }
              return totalCost;
            },
            0
          );
          const newItem: ChartData = [category.name, newItemCost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    );
    this.setState({
      chartData: newChartData,
    });
  };

  onBeginDateInputChange = (event: React.ChangeEvent): void => {
    const beginDate = (event.target as HTMLInputElement).value;
    const [beginDatePartDate, beginDateTime] = beginDate.split(" ");
    if (beginDatePartDate.split("").length === 10) {
      const beginDateNormalizedTime =
        beginDateTime !== undefined ? beginDateTime : "00:00";
      const beginDateNormalizedPartDate = beginDatePartDate
        .split(".")
        .reverse()
        .join("-");
      const beginDateResultPartDate = [
        beginDateNormalizedPartDate,
        beginDateNormalizedTime,
      ].join("T");
      const beginDateResultDate = new Date(
        Date.parse(beginDateResultPartDate)
      ).valueOf();

      this.setState({
        showCostsBeginDate: beginDateResultDate,
      });
    }
  };

  onEndDateInputChange = (event: React.ChangeEvent): void => {
    const endDate = (event.target as HTMLButtonElement).value;
    const [endDatePartDate, endDateTime] = endDate.split(" ");
    if (endDatePartDate.split("").length) {
      const endDateNormalizedTime =
        endDateTime !== undefined ? endDateTime : "00:00";
      const endDateNormalizedPartDate = endDatePartDate
        .split(".")
        .reverse()
        .join("-");
      const endDateResultPartDate = [
        endDateNormalizedPartDate,
        endDateNormalizedTime,
      ].join("T");
      const endDateResultDate = new Date(
        Date.parse(endDateResultPartDate)
      ).valueOf();

      this.setState({
        showCostsEndDate: endDateResultDate,
      });
    }
  };

  onArbitratyTimePeriodLinkClick = (): void => {
    const beginDate = (
      document.querySelector(".chart-begin-input") as HTMLInputElement
    ).value;
    const [beginDatePartDate, beginDateTime] = beginDate.split(" ");
    const beginDateNormalizedTime =
      beginDateTime !== undefined ? beginDateTime : "00:00";
    const beginDateNormalizedPartDate = beginDatePartDate
      .split(".")
      .reverse()
      .join("-");
    const beginDateResultPartDate = [
      beginDateNormalizedPartDate,
      beginDateNormalizedTime,
    ].join("T");
    const beginDateResultDate = new Date(
      Date.parse(beginDateResultPartDate)
    ).valueOf();

    const endDate = (
      document.querySelector(".chart-end-input") as HTMLButtonElement
    ).value;
    const [endDatePartDate, endDateTime] = endDate.split(" ");
    const endDateNormalizedTime =
      endDateTime !== undefined ? endDateTime : "00:00";
    const endDateNormalizedPartDate = endDatePartDate
      .split(".")
      .reverse()
      .join("-");
    const endDateResultPartDate = [
      endDateNormalizedPartDate,
      endDateNormalizedTime,
    ].join("T");
    const endDateResultDate = new Date(
      Date.parse(endDateResultPartDate)
    ).valueOf();

    const newChartData = this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        if (category.parentID === "") {
          const newItemCost = category.costHistory.reduce(
            (totalCost: number, costItem: CostHistoryItem) => {
              if (
                costItem.date >= beginDateResultDate &&
                costItem.date <= endDateResultDate
              ) {
                return totalCost + costItem.cost;
              }
              return totalCost;
            },
            0
          );
          const newItem: ChartData = [category.name, newItemCost];
          acc.push(newItem);
        }
        return acc;
      },
      [["Category", "Costs"]]
    );
    this.setState({
      chartData: newChartData,
    });
  };

  render(): JSX.Element {
    const layout = (
      <>
        <div className={"chart_simply-links-block"}>
          <p data-testid="ShowCostParag">Show cost</p>
          <Link
            onClick={this.onAllLinkClick}
            to="/chart_all"
            data-testid="AllLink"
            className={"chart_link"}
          >
            All
          </Link>
          <Link
            onClick={this.onDayLinkClick}
            to="/chart_for_day"
            data-testid="DayLink"
            className={"chart_link"}
          >
            For day
          </Link>
          <Link
            onClick={this.onLastWeekLinkClick}
            to="/chart_for_last_week"
            data-testid="WeekLink"
            className={"chart_link"}
          >
            For last week
          </Link>
          <Link
            onClick={this.onLastMonthLinkClick}
            to="/chart_for_last_month"
            data-testid="MonthLink"
            className={"chart_link"}
          >
            For last month
          </Link>
        </div>
        <div className={"chart_cost-for-time-block"}>
          For an arbitrary period of time
          <p>Begin date:</p>
          <input
            type="text"
            onChange={this.onBeginDateInputChange}
            className={"chart-begin-input"}
            data-testid="dateBeginInput"
          />
          <p>End date:</p>
          <input
            type="text"
            onChange={this.onEndDateInputChange}
            className={"chart-end-input"}
            data-testid="dateEndInput"
          />
          <Link
            to={`/chart_variable_date/${this.state.showCostsBeginDate}-${this.state.showCostsEndDate}`}
            data-testid="VariableDateLink"
          >
            <button
              className={"chart_find-cost-button"}
              onClick={this.onArbitratyTimePeriodLinkClick}
            >
              Find costs
            </button>
          </Link>
        </div>
        <Chart
          chartType="PieChart"
          loader={<div className={"chart_chart-loader"}>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            title: "Cost Categories",
          }}
          rootProps={{ "data-testid": "Chart" }}
          className={"chart_chart"}
        />
      </>
    );
    return layout;
  }
}

export const ChartBlock = ChartBlockConnector(ChartBlockWithoutStore);
