import type { ReactNode } from "react";

import type { Placement } from "react-bootstrap/esm/types";
import type { Showing } from "@neverquest/types/enums";

export type ComparisonProps = null | { showingType: Showing; subtrahend: number };

export type IconImageProps = {
  Icon: SVGIcon;
  ignoreColor?: boolean;
  isFlipped?: boolean;
  isMirrored?: boolean;
  onClick?: () => void;
  overlayPlacement?: Placement;
  size?: "small" | "tiny";
  tooltip?: ReactNode;
};

export type IconImageDOMProps = Omit<IconImageProps, "Icon">;

export type LootProps = {
  tooltip?: string | undefined;
  value: number;
};

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
