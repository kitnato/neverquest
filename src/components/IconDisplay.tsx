import { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import IconImage from "@neverquest/components/IconImage";
import { IconImageProps, SVGIcon } from "@neverquest/types/props";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({
  contents,
  description,
  Icon,
  iconProps,
  isAnimated,
  tooltip,
}: {
  Icon: SVGIcon;
  animation?: AnimationType;
  contents: ReactNode;
  description?: ReactNode;
  iconProps?: Partial<IconImageProps>;
  isAnimated?: boolean;
  tooltip: string;
}) {
  const { isFlipped, placement } = iconProps || {};

  return (
    <Stack
      className={isAnimated ? getAnimationClass({ type: AnimationType.FlipInX }) : undefined}
      direction="horizontal"
      gap={3}
    >
      <IconImage Icon={Icon} isFlipped={isFlipped} placement={placement} tooltip={tooltip} />

      {description ? (
        <Stack>
          <span>{contents}</span>

          <small className="text-muted">{description}</small>
        </Stack>
      ) : typeof contents === "string" || typeof contents === "number" ? (
        <span>{contents}</span>
      ) : (
        contents
      )}
    </Stack>
  );
}
