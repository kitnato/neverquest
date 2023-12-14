import { OverlayTrigger, Tooltip } from "react-bootstrap";

import type { IconImageProperties } from "@neverquest/types/components";

export function IconImage({
  className,
  Icon,
  isFlipped = false,
  isMirrored = false,
  overlayPlacement,
  tooltip,
}: IconImageProperties) {
  return (
    <OverlayTrigger
      overlay={<Tooltip>{tooltip}</Tooltip>}
      placement={overlayPlacement}
      trigger={tooltip === undefined ? [] : ["focus", "hover"]}
    >
      <div>
        <Icon
          className={`icon-image${className === undefined ? "" : ` ${className}`}`}
          style={{
            transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})`,
          }}
        />
      </div>
    </OverlayTrigger>
  );
}
