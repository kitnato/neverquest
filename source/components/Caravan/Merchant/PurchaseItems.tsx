import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { PurchasableItems } from "@neverquest/components/Caravan/Merchant/PurchasableItems"
import { merchantInventory } from "@neverquest/state/caravan"

export function PurchaseItems() {
	const merchantInventoryValue = useRecoilValue(merchantInventory)

	const newItems = merchantInventoryValue.filter(({ isReturned }) => !isReturned)

	return (
		<Stack gap={3}>
			<h6>Purchase items</h6>

			{newItems.length === 0
				? <span className="fst-italic">Nothing available.</span>

				: <PurchasableItems merchantItems={newItems} />}
		</Stack>
	)
}
