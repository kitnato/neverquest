import type { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { IconImageDOMProps, SVGIcon } from "@neverquest/types/props";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconDisplay({
  className,
  contents,
  description,
  Icon,
  iconProps,
  isAnimated = false,
  isSpaced = false,
  tooltip,
}: {
  className?: string;
  contents: ReactNode;
  description?: ReactNode;
  Icon: SVGIcon;
  iconProps?: IconImageDOMProps;
  isAnimated?: boolean;
  isSpaced?: boolean;
  tooltip?: string;
}) {
  const classNameFinal = `${className ?? ""}${
    isAnimated ? getAnimationClass({ type: "flipInX" }) : ""
  }`;

  return (
    <Stack
      className={classNameFinal === "" ? undefined : classNameFinal}
      direction="horizontal"
      gap={isSpaced ? 5 : iconProps?.size === "tiny" ? 1 : 3}
    >
      <IconImage Icon={Icon} tooltip={tooltip} {...iconProps} />

      {description !== undefined &&
      description !== null &&
      description !== false &&
      description !== "" ? (
        <div className="w-100">
          <div>{contents}</div>

          <small className="text-muted">{description}</small>
        </div>
      ) : typeof contents === "string" || Number.isInteger(contents) ? (
        <span>{contents}</span>
      ) : (
        contents
      )}
    </Stack>
  );
}
