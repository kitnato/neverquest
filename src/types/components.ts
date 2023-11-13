import type { FunctionComponent, ReactNode, SVGProps } from "react";
import type { Placement } from "react-bootstrap/esm/types";

import type { UISize } from "@neverquest/types/ui";
import type { Showing } from "@neverquest/types/unions";

export type Comparison =
  | {
      showing: Showing;
      subtrahend: number;
    }
  | undefined;

export type IconImageProperties = {
  Icon: SVGIcon;
  isFlipped?: boolean;
  isMirrored?: boolean;
  isStencilled?: boolean;
  onClick?: () => void;
  overlayPlacement?: Placement;
  size?: UISize;
  tooltip?: ReactNode;
};

export type IconImageDOMProperties = Omit<IconImageProperties, "Icon">;

export type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;

type TabData = {
  Component: FunctionComponent;
  Icon: SVGIcon;
  label: string;
};

export type TabsData = [TabData, ...TabData[]];
