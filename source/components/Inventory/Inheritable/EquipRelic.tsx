import { Button } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { ownedItem } from "@neverquest/state/inventory"
import { isRelicEquipped } from "@neverquest/state/items"

import type { RelicItem } from "@neverquest/types"
import type { Relic } from "@neverquest/types/unions"

export function EquipRelic({ relic }: { relic: Relic }) {
	const ownedItemValue = useRecoilValue(ownedItem(relic))
	const isRelicEquippedValue = useRecoilValue(isRelicEquipped(relic))

	const toggleEquipItem = useToggleEquipItem()

	return (
		<Button
			onClick={() => {
				toggleEquipItem({ item: ownedItemValue as RelicItem })
			}}
			variant="outline-dark"
		>
			<span>{isRelicEquippedValue ? "Unequip" : "Equip"}</span>
		</Button>
	)
}
