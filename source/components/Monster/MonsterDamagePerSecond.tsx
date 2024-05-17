import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { monsterDamageAilingPerSecond } from "@neverquest/state/monster"

export function MonsterDamagePerSecond() {
	const ownedItemThaumaturgicGoggles = useRecoilValue(ownedItem("thaumaturgic goggles"))
	const monsterDamageAilingPerSecondValue = useRecoilValue(monsterDamageAilingPerSecond)

	if (ownedItemThaumaturgicGoggles !== undefined) {
		return (
			<IconDisplay
				className="text-nowrap"
				Icon={IconDamagePerSecond}
				iconProps={{ className: "small", overlayPlacement: "bottom" }}
				tooltip="Monster damage per second"
			>
				<span>{monsterDamageAilingPerSecondValue}</span>
			</IconDisplay>
		)
	}
}
