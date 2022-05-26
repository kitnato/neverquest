import { Equipment } from "neverquest/types/core";

export type InventoryProps = {
  id: symbol;
  item: Equipment;
};

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}
