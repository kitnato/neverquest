import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { OverlayPlacement } from "@neverquest/types/ui";
import { TRANSPARENT_PIXEL } from "@neverquest/utilities/constants";

export default function ImageIcon({
  flipped = false,
  icon = TRANSPARENT_PIXEL,
  placement = OverlayPlacement.Top,
  tooltip,
}: Partial<{
  flipped: boolean;
  icon: string;
  placement: OverlayPlacement;
  tooltip: JSX.Element | string;
}>) {
  const Image = <img src={icon} style={{ height: 35, transform: `scaleX(${flipped ? -1 : 1})` }} />;

  return tooltip ? (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={placement}>
      {Image}
    </OverlayTrigger>
  ) : (
    Image
  );
}
