import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { IconImageProps } from "@neverquest/types/props";
import { OverlayPlacement } from "@neverquest/types/ui";

export function IconImage({
  Icon,
  isFlipped = false,
  placement = OverlayPlacement.Top,
  tooltip,
}: IconImageProps) {
  const IconStyled = () => (
    <Icon style={{ height: 36, transform: `scaleX(${isFlipped ? -1 : 1})` }} />
  );

  if (tooltip) {
    return (
      <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={placement}>
        <span>
          <IconStyled />
        </span>
      </OverlayTrigger>
    );
  }

  return <IconStyled />;
}
