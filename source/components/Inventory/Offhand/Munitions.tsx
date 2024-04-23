import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import { weapon } from "@neverquest/state/gear"
import { munitions } from "@neverquest/state/items"
import { isRanged } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Munitions() {
	const munitionsValue = useRecoilValue(munitions)
	const weaponValue = useRecoilValue(weapon)

	useDeltaText({
		delta: "munitions",
		state: munitions,
	})

	return (
		<IconDisplay
			className={getAnimationClass({ animation: "flipInX" })}
			Icon={IconMunitions}
			tooltip="Munitions"
		>
			<Stack direction="horizontal" gap={1}>
				<span>{formatNumber({ value: munitionsValue })}</span>

				<DeltasDisplay delta="munitions" />

				{
					isRanged(weaponValue) && (weaponValue.munitionsCost > munitionsValue)
					&& <span className="text-danger">{`${LABEL_SEPARATOR} (${weaponValue.munitionsCost})`}</span>

				}
			</Stack>
		</IconDisplay>
	)
}
