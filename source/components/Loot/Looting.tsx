import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter"
import IconLooting from "@neverquest/icons/looting.svg?react"
import { isLooting } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import { isLootAvailable } from "@neverquest/state/resources"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Looting() {
	const isLootingValue = useRecoilValue(isLooting)
	const isLootAvailableValue = useRecoilValue(isLootAvailable)
	const ownedItemEnderHook = useRecoilValue(ownedItem("ender hook"))

	if (ownedItemEnderHook === undefined && isLootingValue) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconLooting}
				tooltip="Looting"
			>
				<LootingMeter />
			</IconDisplay>
		)
	}

	if (isLootAvailableValue) {
		return <hr />
	}
}
