import type { Dispatch, SetStateAction } from "react";
import { FormControl } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconGearLevel from "@neverquest/icons/gear-level.svg?react";
import { formatNumber } from "@neverquest/utilities/formatters";

export function SetGearLevel({
  maximum,
  state: [gearLevel, setGearLevel],
}: {
  maximum: number;
  state: [number, Dispatch<SetStateAction<number>>];
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

          setGearLevel(parsedValue);
        }}
        type="number"
        value={formatNumber({ value: gearLevel })}
      />
    </IconDisplay>
  );
}
