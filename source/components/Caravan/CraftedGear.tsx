import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { LABEL_OVER_ENCUMBERED, POPOVER_TRIGGER } from "@neverquest/data/general"
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useCanFit } from "@neverquest/hooks/actions/useCanFit"
import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { getAnimationClass } from "@neverquest/utilities/getters"

import type { GearItem } from "@neverquest/types"

export function CraftedGear({ item, onTransfer }: { item: GearItem, onTransfer: () => void }) {
	const { weight } = item

	const acquireItem = useAcquireItem()
	const canFit = useCanFit()
	const toggleEquipItem = useToggleEquipItem()

	const canFitItem = canFit(weight)

	return (
		<Stack gap={3}>
			<div className={`mx-auto ${getAnimationClass({ animation: "pulse" })}`}>
				<ItemDisplay
					item={item}
					overlayPlacement="top"
				/>
			</div>

			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>{LABEL_OVER_ENCUMBERED}</span>
					</Tooltip>
				)}
				trigger={canFitItem ? [] : POPOVER_TRIGGER}
			>
				<div>
					<Button
						className="w-100"
						disabled={!canFitItem}
						onClick={() => {
							const acquisitionStatus = acquireItem(item)

							if (acquisitionStatus === "failure") {
								return
							}

							onTransfer()

							if (acquisitionStatus === "equip") {
								toggleEquipItem({ item })
							}
						}}
						variant="outline-dark"
					>
						<span>Acquire</span>
					</Button>
				</div>
			</OverlayTrigger>
		</Stack>
	)
}
