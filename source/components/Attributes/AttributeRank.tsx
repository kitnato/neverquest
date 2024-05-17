import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconRank from "@neverquest/icons/rank.svg?react"
import { attributeRank } from "@neverquest/state/attributes"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Attribute } from "@neverquest/types/unions"

export function AttributeRank({ attribute }: { attribute: Attribute }) {
	const attributeRankState = attributeRank(attribute)
	const attributeRankValue = useRecoilValue(attributeRankState)

	useDeltaText({
		delta: attribute,
		state: attributeRankState,
	})

	return (
		<Stack direction="horizontal" gap={1}>
			<IconDisplay Icon={IconRank} tooltip="Rank">
				<span>{formatNumber({ value: attributeRankValue })}</span>
			</IconDisplay>

			<DeltasDisplay delta={attribute} />
		</Stack>
	)
}
