import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ATTRIBUTES } from "@neverquest/data/attributes"
import { attributeRank } from "@neverquest/state/attributes"
import type { Attribute } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
  const attributeRankValue = useRecoilValue(attributeRank(attribute))

  const { descriptionIcons, format, increment, rankBonus } = ATTRIBUTES[attribute]

  return (
    <IconDisplay Icon={descriptionIcons[0]} iconProps={{ className: `small` }}>
      <span>
        {increment > 0 && `+`}

        {formatNumber({
          format,
          value: rankBonus === undefined ? increment : increment + rankBonus * attributeRankValue,
        })}
      </span>
    </IconDisplay>
  )
}
