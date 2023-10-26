import type { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import type { ResponsiveUtilityValue } from "react-bootstrap/esm/createUtilityClasses";
import type { GapValue } from "react-bootstrap/esm/types";
import { IconImage } from "@neverquest/components/IconImage";
import type { IconImageDOMProps, SVGIcon } from "@neverquest/types/props";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconDisplay({
  children,
  description,
  gap = 3,
  Icon,
  iconProps,
  isAnimated = false,
  isFullWidth = false,
  tooltip,
}: {
  children?: ReactNode;
  description?: ReactNode;
  gap?: ResponsiveUtilityValue<GapValue>;
  Icon: SVGIcon;
  iconProps?: IconImageDOMProps;
  isAnimated?: boolean;
  isFullWidth?: boolean;
  tooltip?: string;
}) {
  return (
    <Stack
      className={`${isFullWidth ? "w-100" : undefined} ${
        isAnimated ? getAnimationClass({ name: "flipInX" }) : undefined
      }`}
      direction="horizontal"
      gap={iconProps?.size === "small" ? 1 : gap}
    >
      <IconImage Icon={Icon} tooltip={tooltip} {...iconProps} />

      <Stack gap={1}>
        {children}

        <small className="text-muted">{description}</small>
      </Stack>
    </Stack>
  );
}
