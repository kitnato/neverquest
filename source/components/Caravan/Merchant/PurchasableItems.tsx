import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { EradicateItem } from "@neverquest/components/Inventory/EradicateItem"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { fittedGems } from "@neverquest/state/gear"
import { isGearItem } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSecondHandPrice } from "@neverquest/utilities/getters"
import { stackItems } from "@neverquest/utilities/helpers"

import type { MerchantInventoryItem } from "@neverquest/types"

export function PurchasableItems({
	isSecondHand = false,
	merchantItems,
}: {
	isSecondHand?: boolean
	merchantItems: MerchantInventoryItem[]
}) {
	const fittedGemsValue = useRecoilValue(fittedGems)

	return (
		<>
			{stackItems(merchantItems).map(({ amount, item }) => {
				const { ID, price } = item

				const purchasePrice = isSecondHand
					? getSecondHandPrice({
						gemsFitted: isGearItem(item) ? (fittedGemsValue[item.ID] ?? []).length : 0,
						item,
					})
					: price

				return (
					<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
						<ItemDisplay amount={amount} item={item} />

						<Stack className="ms-2" direction="horizontal" gap={3}>
							<IconDisplay Icon={IconEssence} tooltip="Price">
								<span>{formatNumber({ value: purchasePrice })}</span>
							</IconDisplay>

							<PurchaseItem merchantItem={item} price={purchasePrice} />

							{isSecondHand && <EradicateItem item={item} />}
						</Stack>
					</div>
				)
			})}
		</>
	)
}
