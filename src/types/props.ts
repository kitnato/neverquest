import { DeltaDisplay } from "@neverquest/types/ui";

export type HealthChangeProps = number | { delta: number; deltaContents: DeltaDisplay };

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}
