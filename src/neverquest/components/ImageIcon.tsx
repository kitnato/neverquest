import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { UIOverlayPlacement } from "neverquest/env";
import { TRANSPARENT_PIXEL } from "neverquest/utilities/constants";

export default function ImageIcon({
  flipped = false,
  icon = TRANSPARENT_PIXEL,
  placement = UIOverlayPlacement.Top,
  tooltip,
}: Partial<{
  flipped: boolean;
  icon: string;
  placement: UIOverlayPlacement;
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
