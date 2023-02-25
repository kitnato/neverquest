import { ReactNode } from "react";

import { Placement } from "react-bootstrap/esm/types";

export interface IconImageProps {
  Icon: SVGIcon;
  isFlipped?: boolean;
  isSmall?: boolean;
  placement?: Placement;
  tooltip?: ReactNode;
}

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
