import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { TRANSPARENT_PIXEL } from "neverquest/utilities/constants";

export default function ImageIcon({
  icon = TRANSPARENT_PIXEL,
  tooltip,
}: Partial<{
  icon: string;
  tooltip: JSX.Element | string;
}>) {
  const Image = <img src={icon} style={{ height: 35 }} />;

  return tooltip ? (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement="top">
      {Image}
    </OverlayTrigger>
  ) : (
    Image
  );
}
