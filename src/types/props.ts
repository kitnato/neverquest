import { ReactNode } from "react";

import { OverlayPlacement } from "@neverquest/types/ui";

export interface IconImageProps {
  Icon: SVGIcon;
  isFlipped?: boolean;
  placement?: OverlayPlacement;
  tooltip?: ReactNode;
}

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
