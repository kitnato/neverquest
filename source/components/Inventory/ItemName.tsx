import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { GemDescription } from "@neverquest/components/Inventory/GemDescription"
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail"
import { CONSUMABLES, INFUSABLES, RELICS } from "@neverquest/data/items"
import type { ConsumableItem, GemItem, InheritableItem } from "@neverquest/types"
import {
	isConsumableItem,
	isGemItem,
	isInfusableItem,
	isRelicItem,
} from "@neverquest/types/type-guards"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"

export function ItemName({
	amount,
	item,
}: {
	amount?: number
	item: ConsumableItem | GemItem | InheritableItem
}) {
	return (
		<OverlayTrigger
			overlay={(
				<Popover>
					<PopoverBody className="text-center">
						<Stack gap={3}>
							{
								isGemItem(item)
									? (
										<GemDescription gem={item.name} />
									)
									: (isRelicItem(item) && item.name === "[P71NQ]"
										? (
											<Stack className="monospaced">
												<span>Priority 0 - BREACH IN PROGRESS</span>

												<span>Location: Outfloor ██-██#77</span>

												<span>Initializing: NqstCipher-██-███</span>

												<span>Processing: 7.8% ...</span>

												<span>Error: δ destabilization</span>

												<span>LEAKAGE IMMINENT</span>
											</Stack>
										)
										: (
											(() => {
												const { description, descriptionIcons } = isConsumableItem(item)
													? CONSUMABLES[item.name]
													: (isInfusableItem(item)
														? INFUSABLES[item.name]
														: RELICS[item.name])

												return (
													<DescriptionDisplay
														description={description}
														descriptionIcons={descriptionIcons}
													/>
												)
											})()
										)
									)
							}

							<DetailsTable>
								<WeightDetail amount={amount} weight={item.weight} />
							</DetailsTable>
						</Stack>
					</PopoverBody>
				</Popover>
			)}
			placement="right"
		>
			<span className="fitted">
				{capitalizeAll(item.name)}
				{amount !== undefined && amount > 1 ? ` ×${formatNumber({ value: amount })}` : ""}
				&nbsp;
			</span>
		</OverlayTrigger>
	)
}
