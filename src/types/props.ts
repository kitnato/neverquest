import type { ReactNode } from "react";
import type { Placement } from "react-bootstrap/esm/types";

import type { Showing } from "@neverquest/types/unions";

export type ComparisonProps = {
  showingType: Showing;
  subtrahend: number;
} | null;

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

export type ItemAcquisitionResult = "autoEquip" | "noFit" | "success";

export type ItemAcquisition = "donation" | "purchase";

export type ItemForfeiture = "consumption" | "sale";

export type ItemTrade = "purchase" | "sale";

export type ResourceTransaction = Partial<{
  coinsDifference: number;
  essenceDifference: number;
  scrapDifference: number;
}>;

export type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
