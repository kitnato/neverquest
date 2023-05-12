import type { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { IconImageDOMProps, SVGIcon } from "@neverquest/types/props";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconDisplay({
  contents,
  description,
  Icon,
  iconProps,
  isAnimated,
  isSpaced,
  tooltip,
}: {
  contents: ReactNode;
  description?: ReactNode;
  Icon: SVGIcon;
  iconProps?: IconImageDOMProps;
  isAnimated?: boolean;
  isSpaced?: boolean;
  tooltip: string;
}) {
  const { isFlipped, overlayPlacement } = iconProps ?? {};

  return (
    <Stack
      className={isAnimated ? getAnimationClass({ type: "flipInX" }) : ""}
      direction="horizontal"
      gap={isSpaced ? 5 : 3}
    >
      <IconImage
        Icon={Icon}
        isFlipped={isFlipped}
        overlayPlacement={overlayPlacement}
        tooltip={tooltip}
      />

      {description !== undefined &&
      description !== null &&
      description !== false &&
      description !== "" ? (
        <Stack>
          <span>{contents}</span>

          <small className="text-muted">{description}</small>
        </Stack>
      ) : typeof contents === "string" || Number.isInteger(contents) ? (
        <span>{contents}</span>
      ) : (
        contents
      )}
    </Stack>
  );
}
