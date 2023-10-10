import type { Dispatch, SetStateAction } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { stage } from "@neverquest/state/encounter";
import { formatValue } from "@neverquest/utilities/formatters";

export function SetGearLevel({
  state: [gearLevel, setGearLevel],
}: {
  state: [number, Dispatch<SetStateAction<number>>];
}) {
  const stageValue = useRecoilValue(stage);

  const maximumWeaponLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  return (
    <IconDisplay
      contents={
        <FormControl
          max={maximumWeaponLevel}
          min={1}
          onChange={({ target: { value } }) => {
            if (!value) {
              return;
            }

            const parsedValue = Number.parseInt(value);

            if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumWeaponLevel) {
              return;
            }

            setGearLevel(parsedValue);
          }}
          type="number"
          value={formatValue({ value: gearLevel })}
        />
      }
      Icon={IconGearLevel}
      iconProps={{ overlayPlacement: "left" }}
      tooltip="Level"
    />
  );
}