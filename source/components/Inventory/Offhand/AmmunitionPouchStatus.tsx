import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import IconAmmunition from "@neverquest/icons/ammunition.svg?react"
import { ammunition, ammunitionCapacity } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"

export function AmmunitionPouchStatus() {
	const ammunitionValue = useRecoilValue(ammunition)
	const ammunitionCapacityValue = useRecoilValue(ammunitionCapacity)

	return (
		<IconDisplay
			Icon={IconAmmunition}
			iconProps={{ className: "small", overlayPlacement: "bottom" }}
			tooltip="Ammunition"
		>
			<span>
				{formatNumber({ value: ammunitionValue })}
				{" / "}
				{formatNumber({
					value: ammunitionCapacityValue,
				})}
			</span>
		</IconDisplay>
	)
}
