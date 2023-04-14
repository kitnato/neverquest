import type { ReactNode } from "react";

import type { Placement } from "react-bootstrap/esm/types";

export type IconImageProps = {
  Icon: SVGIcon;
  isFlipped?: boolean;
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
