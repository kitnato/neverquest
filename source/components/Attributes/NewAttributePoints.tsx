import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_EMPTY } from "@neverquest/data/general"
import IconAttributePoints from "@neverquest/icons/attribute-points.svg?react"
import { attributePoints, powerLevel } from "@neverquest/state/attributes"
import { essence, essenceLoot } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAttributePoints } from "@neverquest/utilities/getters"

export function NewAttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints)
  const essenceValue = useRecoilValue(essence)
  const essenceLootValue = useRecoilValue(essenceLoot)
  const powerLevelValue = useRecoilValue(powerLevel)

  const difference =
    getAttributePoints({ essence: essenceValue + essenceLootValue, powerLevel: powerLevelValue }) -
    attributePointsValue

  return (
    <IconDisplay Icon={IconAttributePoints} tooltip="New attribute points">
      <span className="text-nowrap">
        {difference === 0 ? LABEL_EMPTY : `+${formatNumber({ value: difference })}`}
      </span>
    </IconDisplay>
  )
}
