import { OverlayTrigger, Tooltip } from "react-bootstrap";

import type { IconImageProperties } from "@neverquest/types/components";

export function IconImage({
  Icon,
  isFlipped = false,
  isMirrored = false,
  isStencilled = false,
  overlayPlacement,
  size,
  tooltip,
}: IconImageProperties) {
  return (
    <OverlayTrigger
      overlay={<Tooltip>{tooltip}</Tooltip>}
      placement={overlayPlacement}
      trigger={tooltip === undefined ? [] : ["focus", "hover"]}
    >
      <span>
        <Icon
          className={`icon-image${size ? ` ${size}` : ""}${isStencilled ? " stencilled" : ""}`}
          style={{
            transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})`,
          }}
        />
      </span>
    </OverlayTrigger>
  );
}
