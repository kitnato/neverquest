import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { TrainAlchemistSkill } from "@neverquest/components/Caravan/Alchemist/TrainAlchemistSkill"
import { TransmuteGems } from "@neverquest/components/Caravan/Alchemist/TransmuteGems"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general"
import { inventory } from "@neverquest/state/inventory"
import { isGemItem } from "@neverquest/types/type-guards"
import { stackItems } from "@neverquest/utilities/helpers"

export function Alchemist() {
	const inventoryValue = useRecoilValue(inventory)

	const storedGemsStack = stackItems(
		inventoryValue
			.filter(isGemItem)
			.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
	)

	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Stored gems</h6>

				{storedGemsStack.length === 0
					? <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>

					: storedGemsStack.map(({ amount, item }) =>
						<ItemDisplay amount={amount} item={item} key={item.ID} />,
					)}
			</Stack>

			<Stack gap={3}>
				<h6>Transmute gems</h6>

				<TransmuteGems />
			</Stack>

			<TrainAlchemistSkill />
		</Stack>
	)
}
