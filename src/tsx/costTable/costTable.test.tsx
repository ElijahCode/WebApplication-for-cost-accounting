import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { CostTable } from './costTable'
import { createCostItem } from '../../ts/createCostItem/createCostITem'

describe("Testing costTable component", () => {
    describe('Testing basic markup', () => {
        const costItem1 = createCostItem(100, Date.now())
        const costItem2 = createCostItem(200, Date.now())
        const costItem3 = createCostItem(300, Date.now())

        const costTableProps = {
            costHistory: [{...costItem1}, {...costItem2}, {...costItem3}]
        }

        beforeEach(() => {
            render(<CostTable {...costTableProps} />)
        })

        it('Contain cost table', () => {
            expect(screen.getByTestId("CostTable")).toBeInTheDocument();
        })

        it('Contain date block', () => {
            expect(screen.getByTestId("DateBlock")).toBeInTheDocument();
            expect(screen.getByTestId('DateBeginParag')).toBeInTheDocument();
            expect(screen.getByTestId('DateBeginInput')).toBeInTheDocument();
            expect(screen.getByTestId('DateEndParag')).toBeInTheDocument();
            expect(screen.getByTestId('DateEndInput')).toBeInTheDocument();
        })

        it('Contain add cost block', () => {
            expect(screen.getByTestId("addCostBlock")).toBeInTheDocument();
            expect(screen.getByTestId('addCostParag')).toBeInTheDocument();
            expect(screen.getByTestId('addCostInput')).toBeInTheDocument();
            expect(screen.getByTestId('addCostDateParag')).toBeInTheDocument();
            expect(screen.getByTestId('AddCostButton')).toBeInTheDocument();
        })

        it('Contain cost items', () => {
            expect(screen.getAllByTestId("tableString").length).toBe(3);
            expect(screen.getAllByTestId("costName").length).toBe(3);
            expect(screen.getAllByTestId("costDate").length).toBe(3);
            expect(screen.getAllByTestId("buttonChagneCost").length).toBe(3);
            expect(screen.getAllByTestId("buttonDeleteCost").length).toBe(3);
        })
    })
})