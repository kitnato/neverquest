import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ATTRIBUTES } from "@neverquest/data/attributes"
import { attributeRank } from "@neverquest/state/attributes"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Attribute } from "@neverquest/types/unions"

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
	const attributeRankValue = useRecoilValue(attributeRank(attribute))

	const { descriptionIcons, format, increment, incrementBonus } = ATTRIBUTES[attribute]

	return (
		<IconDisplay Icon={descriptionIcons[0]} iconProps={{ className: "small" }}>
			<span>
				{increment > 0 && "+"}

				{formatNumber({
					format,
					value: incrementBonus === undefined
						? increment
						: Math.min(increment + incrementBonus.perRank * attributeRankValue, incrementBonus.maximum),
				})}
			</span>
		</IconDisplay>
	)
}
