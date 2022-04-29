import { InventoryContent } from "neverquest/types/core";

export type InventoryContentProps = InventoryContent & {
  key: string;
};

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}
