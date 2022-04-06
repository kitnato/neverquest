import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { TRANSPARENT_PIXEL } from "neverquest/utilities/constants";

export default function ImageIcon({
  flipped = false,
  icon = TRANSPARENT_PIXEL,
  tooltip,
}: Partial<{
  flipped?: boolean;
  icon?: string;
  tooltip?: JSX.Element | string;
}>) {
  const Image = <img src={icon} style={{ height: 35, transform: `scaleX(${flipped ? -1 : 1})` }} />;

  return tooltip ? (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement="top">
      {Image}
    </OverlayTrigger>
  ) : (
    Image
  );
}
