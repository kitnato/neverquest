import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { LABEL_NO_ESSENCE, LABEL_OVER_ENCUMBERED, POPOVER_TRIGGER } from "@neverquest/data/general"
import { useCanFit } from "@neverquest/hooks/actions/useCanFit"
import { essence } from "@neverquest/state/resources"

import type { InventoryItem } from "@neverquest/types"

export function PurchaseItemButton({
	item,
	onPurchase,
	purchasePrice,
}: {
	item: InventoryItem
	onPurchase: () => void
	purchasePrice?: number
}) {
	const essenceValue = useRecoilValue(essence)

	const { price, weight } = item

	const canFit = useCanFit()

	const canFitItem = canFit(weight)
	const isAffordable = (purchasePrice ?? price) <= essenceValue
	const isPurchasable = isAffordable && canFitItem

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<Stack>
						{!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

						{!canFitItem && <span>{LABEL_OVER_ENCUMBERED}</span>}
					</Stack>
				</Tooltip>
			)}
			trigger={isPurchasable ? [] : POPOVER_TRIGGER}
		>
			<div>
				<Button disabled={!isPurchasable} onClick={onPurchase} variant="outline-dark">
					<span>Buy</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}
