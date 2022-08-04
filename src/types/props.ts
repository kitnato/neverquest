import { DeltaDisplay } from "@neverquest/types/ui";

export type ReserveChangeProps = number | { delta: number; deltaContents: DeltaDisplay };

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}
