import { FormControl } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconGearLevel from "@neverquest/icons/gear-level.svg?react";
import { formatNumber } from "@neverquest/utilities/formatters";

export function SetGearLevel({
  level,
  maximum,
  setLevel,
}: {
  level: number;
  maximum: number;
  setLevel: (level: number) => void;
}) {
  return (
    <IconDisplay Icon={IconGearLevel} iconProps={{ overlayPlacement: "left" }} tooltip="Gear level">
      <FormControl
        max={maximum}
        min={1}
        onChange={({ target: { value } }) => {
          if (!value) {
            return;
          }

          const parsedValue = Number.parseInt(value);

          if (Number.isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximum) {
            return;
          }

          setLevel(parsedValue);
        }}
        type="number"
        value={formatNumber({ value: level })}
      />
    </IconDisplay>
  );
}
