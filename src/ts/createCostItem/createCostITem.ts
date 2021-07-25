import { uuid } from "uuidv4";

export function createCostItem(cost: number, date: number): CostHistoryItem {
  const id = uuid();
  return {
    cost,
    date,
    id,
  };
}
