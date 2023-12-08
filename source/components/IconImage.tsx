import { OverlayTrigger, Tooltip } from "react-bootstrap";

import type { IconImageProperties } from "@neverquest/types/components";

export function IconImage({
  Icon,
  isFlipped = false,
  isMirrored = false,
  isSmall = false,
  isStencilled = false,
  overlayPlacement,
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
          className={`icon-image${isSmall ? " small" : ""}${isStencilled ? " stencilled" : ""}`}
          style={{
            transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})`,
          }}
        />
      </span>
    </OverlayTrigger>
  );
}
