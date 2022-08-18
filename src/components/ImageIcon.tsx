import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { SVGIcon } from "@neverquest/types/props";
import { OverlayPlacement } from "@neverquest/types/ui";

export default function ImageIcon({
  flipped = false,
  Icon,
  placement = OverlayPlacement.Top,
  tooltip,
}: {
  flipped?: boolean;
  Icon: SVGIcon;
  placement?: OverlayPlacement;
  tooltip?: JSX.Element | string;
}) {
  const IconStyled = <Icon style={{ height: 36, transform: `scaleX(${flipped ? -1 : 1})` }} />;

  if (tooltip) {
    return (
      <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={placement}>
        <div>{IconStyled}</div>
      </OverlayTrigger>
    );
  }

  return IconStyled;
}
