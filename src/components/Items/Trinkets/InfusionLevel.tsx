import type { Placement } from "react-bootstrap/esm/types";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconInfusionLevel } from "@neverquest/icons/infusion-level.svg";
import { formatValue } from "@neverquest/utilities/formatters";

export function InfusionLevel({
  level,
  overlayPlacement,
}: {
  level: number;
  overlayPlacement?: Placement;
}) {
  return (
    <IconDisplay
      contents={formatValue({ value: level })}
      Icon={IconInfusionLevel}
      iconProps={{ overlayPlacement, size: "small" }}
      tooltip="Infusion level"
    />
  );
}
