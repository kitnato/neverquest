import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconAmmunition from "@neverquest/icons/ammunition.svg?react"
import { ammunition } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Ammunition() {
	const ammunitionValue = useRecoilValue(ammunition)

	useDeltaText({
		delta: "ammunition",
		state: ammunition,
	})

	return (
		<IconDisplay
			className={getAnimationClass({ animation: "flipInX" })}
			Icon={IconAmmunition}
			tooltip="Ammunition"
		>
			<Stack direction="horizontal" gap={1}>
				<span>{formatNumber({ value: ammunitionValue })}</span>

				<DeltasDisplay delta="ammunition" />
			</Stack>
		</IconDisplay>
	)
}
