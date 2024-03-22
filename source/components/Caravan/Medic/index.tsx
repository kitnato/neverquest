import { Stack } from "react-bootstrap"

import { ReceiveHealing } from "@neverquest/components/Caravan/Medic/ReceiveHealing"
import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable"

export function Medic() {
	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Purchase bandages</h6>

				<PurchaseConsumable consumable="bandages" />
			</Stack>

			<ReceiveHealing />
		</Stack>
	)
}
