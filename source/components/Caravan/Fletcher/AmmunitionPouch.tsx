import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react"
import { ammunition, ammunitionCapacity } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"

export function AmmunitionPouch() {
  const ammunitionValue = useRecoilValue(ammunition)
  const ammunitionCapacityValue = useRecoilValue(ammunitionCapacity)

  useDeltaText({
    delta: `ammunition`,
    state: ammunition,
  })

  return (
    <IconDisplay Icon={IconAmmunitionPouch} tooltip="Ammunition pouch">
      <LabelledProgressBar value={(ammunitionValue / ammunitionCapacityValue) * PERCENTAGE_POINTS}>
        <Stack direction="horizontal" gap={1}>
          <span>
            {formatNumber({ value: ammunitionValue })}&nbsp;/&nbsp;
            {formatNumber({
              value: ammunitionCapacityValue,
            })}
          </span>

          <DeltasDisplay delta="ammunition" />
        </Stack>
      </LabelledProgressBar>
    </IconDisplay>
  )
}
