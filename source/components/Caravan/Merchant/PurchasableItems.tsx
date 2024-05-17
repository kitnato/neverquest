import { Stack } from "react-bootstrap"

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { EradicateItem } from "@neverquest/components/Inventory/EradicateItem"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

import type { MerchantInventoryItem } from "@neverquest/types"

export function PurchasableItems({
	canEradicate = false,
	merchantItems,
}: {
	canEradicate?: boolean
	merchantItems: MerchantInventoryItem[]
}) {
	return (
		<>
			{stackItems(merchantItems).map(({ amount, item }) => {
				const { ID, price } = item

				return (
					<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
						<ItemDisplay amount={amount} item={item} />

						<Stack className="ms-2" direction="horizontal" gap={3}>
							<IconDisplay Icon={IconEssence} tooltip="Price">
								<span>{formatNumber({ value: price })}</span>
							</IconDisplay>

							<PurchaseItem merchantItem={item} />

							{canEradicate && <EradicateItem item={item} />}
						</Stack>
					</div>
				)
			})}
		</>
	)
}
