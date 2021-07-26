import React from 'react';
import { Provider } from 'react-redux'

interface ICostTableProps {
    costHistory: CostHistoryItem[]
}

interface ICostTableState {
    beginDate: number;
    lastDate: number;
    newCostDate: number;
}

export class CostTable extends React.Component<ICostTableProps, ICostTableState> {
    state = {
        beginDate: this.setDefaultBeginDate(),
        lastDate: this.setDefaultLastDate(),
        newCostDate: (new Date(Date.now())).valueOf()
    }

    private setDefaultBeginDate() {
        const toDay = Date.now()
        const firstDayOfCurrentMonth = new Date(toDay).setDate(1).valueOf();
        return firstDayOfCurrentMonth;
    }

    private setDefaultLastDate() {
        const toDay = new Date(Date.now());
        const nextMonth = new Date(toDay.setMonth(toDay.getMonth() + 1).valueOf())
        const lastDayofCurrentMonth = new Date(nextMonth.setDate(0).valueOf())
        return lastDayofCurrentMonth.valueOf();
    }

    render(): JSX.Element {
        const toDayDate = new Date(this.state.newCostDate);
        const layout = 
        <table data-testid="CostTable">
            <div data-testid='DateBlock'>
                <p data-testid='DateBeginParag'>Begin:</p><input type="date" value={this.state.beginDate} data-testid='DateBeginInput'/><p data-testid='DateEndParag'>End:</p><input type="date" value={this.state.lastDate} data-testid='DateEndInput'/>
            </div>
            <div data-testid="addCostBlock">
                <p data-testid="addCostParag">Cost:</p><input type="text" data-testid="addCostInput"/><p data-testid='addCostDateParag'>Date:</p><input type="text" value={`${toDayDate.getDate()}-${toDayDate.getMonth()}-${toDayDate.getFullYear()} ${toDayDate.getHours()}:${toDayDate.getMinutes()}`}/> <button data-testid="AddCostButton">Add task</button>
            </div>
            {this.props.costHistory.map((costItem) => {
                const costDate = new Date(costItem.date);
                const renderCostDate = `${costDate.getDate()}.${costDate.getMonth()}-${costDate.getFullYear()} ${costDate.getHours()}:${costDate.getMinutes()}`
                return <tr key={costItem.id} data-testid='tableString'>
                    <td data-testid='costName'>{costItem.cost}</td><td data-testid='costDate'>{renderCostDate}</td><td><button data-testid='buttonChagneCost'>Change cost</button></td><td ><button data-testid='buttonDeleteCost'>Delete cost</button></td>
                </tr>
            })}
        </table>
        return layout
    }
}