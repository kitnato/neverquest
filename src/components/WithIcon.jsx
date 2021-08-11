import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { TRANSPARENT_PIXEL } from "utilities/constants";

export default function WithIcon({
  icon = TRANSPARENT_PIXEL,
  alt = "",
  children,
  className = "",
}) {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <OverlayTrigger placement="top" overlay={<Tooltip>{alt}</Tooltip>}>
        <img src={icon} alt={alt} className="mr-2" style={{ height: 35 }} />
      </OverlayTrigger>

      {children}
    </div>
  );
}
