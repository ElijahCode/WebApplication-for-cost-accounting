import React from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";

type ChartData = [IStateCategory["name"], IStateCategory["cost"]];

interface IChartBlockState {
  categories: IStateCategory[];
  chartData: ChartData[];
}

class ChartBlockWithoutStore extends React.Component<any, IChartBlockState> {
  state = {
    categories: this.props.categoriesOfCost,
    chartData: this.props.categoriesOfCost.reduce(
      (acc: ChartData[], category: IStateCategory) => {
        const newItem: ChartData = [category.name, category.cost];
        acc.push(newItem);
        return acc;
      },
      []
    ),
  };

  render(): JSX.Element {
    const layout = (
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={this.state.chartData}
        options={{
          title: "Cost Categories",
        }}
        rootProps={{ "data-testid": "Chart" }}
      />
    );
    return layout;
  }
}

const mapStateToProps = (state: IState) => ({
  categoriesOfCost: state.categoriesOfCost,
});

export const ChartBlock = connect(mapStateToProps)(ChartBlockWithoutStore);
