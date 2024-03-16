import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import { absorbedEssence, powerLevel } from "@neverquest/state/attributes"
import { formatNumber } from "@neverquest/utilities/formatters"

export function PowerLevel() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence)
  const powerLevelValue = useRecoilValue(powerLevel)

  useDeltaText({
    delta: `powerLevel`,
    state: powerLevel,
  })

  return (
    <IconDisplay Icon={IconPowerLevel} tooltip="Power level">
      <Stack direction="horizontal" gap={1}>
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">
                <span>Absorbed essence</span>
              </PopoverHeader>

              <PopoverBody>
                <IconDisplay
                  className="justify-content-center"
                  Icon={IconEssence}
                  iconProps={{ className: `small` }}
                >
                  <span>{formatNumber({ value: absorbedEssenceValue })}</span>
                </IconDisplay>
              </PopoverBody>
            </Popover>
          }
          placement="right"
        >
          <span>{formatNumber({ value: powerLevelValue })}</span>
        </OverlayTrigger>

        <DeltasDisplay delta="powerLevel" />
      </Stack>
    </IconDisplay>
  )
}
