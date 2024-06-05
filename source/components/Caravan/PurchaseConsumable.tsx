import { nanoid } from "nanoid"
import { useState } from "preact/hooks"
import { Stack } from "react-bootstrap"

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import { CONSUMABLES } from "@neverquest/data/items"
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { ConsumableItem } from "@neverquest/types"
import type { Consumable } from "@neverquest/types/unions"

export function PurchaseConsumable({ consumable }: { consumable: Consumable }) {
	const [ID, setID] = useState(nanoid())

	const acquireItem = useAcquireItem()
	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	const { item } = CONSUMABLES[consumable]
	const itemWithID: ConsumableItem = {
		...item,
		ID,
	}
	const { price } = itemWithID

	return (
		<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
			<ItemDisplay item={itemWithID} />

			<Stack className="ms-2" direction="horizontal" gap={3}>
				<IconDisplay Icon={IconEssence} tooltip="Price">
					<span>{formatNumber({ value: price })}</span>
				</IconDisplay>

				<PurchaseItemButton
					item={itemWithID}
					onPurchase={() => {
						acquireItem(itemWithID)
						transactEssence(-price)

						progressQuest({
							quest: "purchasingConsumable",
						})

						setID(nanoid())
					}}
				/>
			</Stack>
		</div>
	)
}
