import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ATTRIBUTES } from "@neverquest/data/attributes"
import { attributeRank } from "@neverquest/state/attributes"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Attribute } from "@neverquest/types/unions"

export function AttributeIncreaseDetails({ attribute }: { attribute: Attribute }) {
	const attributeRankValue = useRecoilValue(attributeRank(attribute))

	const { descriptionIcons, formatting, increment: { amount, bonus } } = ATTRIBUTES[attribute]

	return (
		<IconDisplay Icon={descriptionIcons[0]} iconProps={{ className: "small" }}>
			<span>
				{amount > 0 && "+"}

				{formatNumber({
					...formatting,
					value: bonus === undefined
						? amount
						: Math.min(amount + bonus.perRank * attributeRankValue, bonus.maximum),
				})}
			</span>
		</IconDisplay>
	)
}
