import type { FunctionComponent, ReactNode, SVGProps } from "react";
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

export type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;

export type TabData = {
  Component: FunctionComponent;
  Icon: SVGIcon;
  label: string;
}[];
