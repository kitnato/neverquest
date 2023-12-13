import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconPowerLevel from "@neverquest/icons/power-level.svg?react";
import { absorbedEssence, powerLevel } from "@neverquest/state/attributes";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PowerLevel() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);
  const powerLevelValue = useRecoilValue(powerLevel);

  useDeltaText({
    delta: "powerLevel",
    state: powerLevel,
  });

  return (
    <IconDisplay Icon={IconPowerLevel} tooltip="Power level">
      <Stack direction="horizontal" gap={1}>
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Absorbed essence</PopoverHeader>

              <PopoverBody>
                <Stack className="justify-content-center" direction="horizontal" gap={1}>
                  <IconImage Icon={IconEssence} isSmall />

                  {formatNumber({ value: absorbedEssenceValue })}
                </Stack>
              </PopoverBody>
            </Popover>
          }
          placement="right"
        >
          <span>{powerLevelValue}</span>
        </OverlayTrigger>

        <DeltasDisplay delta="powerLevel" />
      </Stack>
    </IconDisplay>
  );
}