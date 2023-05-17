import type { ReactNode } from "react";

import type { Placement } from "react-bootstrap/esm/types";
import type { ShowingType } from "@neverquest/types/enums";

export type ComparisonProps = null | { showingType: ShowingType; subtrahend: number };

export type IconImageProps = {
  Icon: SVGIcon;
  ignoreColor?: boolean;
  isFlipped?: boolean;
  isMirrored?: boolean;
  isSmall?: boolean;
  overlayPlacement?: Placement;
  tooltip?: ReactNode;
};

export type IconImageDOMProps = Omit<IconImageProps, "Icon">;

export type LootProps = {
  tooltip?: string | undefined;
  value: number;
};

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
