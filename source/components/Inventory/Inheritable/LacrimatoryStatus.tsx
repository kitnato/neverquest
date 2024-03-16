import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TEARS_MAXIMUM } from "@neverquest/data/items"
import IconTears from "@neverquest/icons/tears.svg?react"
import { tears } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"

export function LacrimatoryStatus() {
  const tearsValue = useRecoilValue(tears)

  return (
    <IconDisplay
      Icon={IconTears}
      iconProps={{ className: `small`, overlayPlacement: `bottom` }}
      tooltip="Tears"
    >
      <span>
        {formatNumber({ value: tearsValue })}&nbsp;/&nbsp;
        {formatNumber({
          value: TEARS_MAXIMUM,
        })}
      </span>
    </IconDisplay>
  )
}
