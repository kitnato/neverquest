import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { TRANSPARENT_PIXEL } from "utilities/constants";

export default function ImageIcon({ icon = TRANSPARENT_PIXEL, tooltip }) {
  const Image = <img alt={tooltip || ""} src={icon} style={{ height: 35 }} />;

  return !tooltip ? (
    Image
  ) : (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement="top">
      {Image}
    </OverlayTrigger>
  );
}
