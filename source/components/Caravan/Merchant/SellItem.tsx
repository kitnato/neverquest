import { Button, Stack } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { merchantInventory } from "@neverquest/state/caravan"
import { fittedGems } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { isGearItem, isRelicItem } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSecondHandPrice } from "@neverquest/utilities/getters"

import type { InventoryItem } from "@neverquest/types"

export function SellItem({ item }: { item: InventoryItem }) {
	const fittedGemsValue = useRecoilValue(fittedGems)
	const setInventory = useSetRecoilState(inventory)
	const setMerchantInventory = useSetRecoilState(merchantInventory)

	const progressQuest = useProgressQuest()
	const toggleEquipItem = useToggleEquipItem()
	const transactEssence = useTransactEssence()

	const secondHandPrice = getSecondHandPrice({
		gemsFitted: (fittedGemsValue[item.ID] ?? []).length,
		item,
	})

	return (
		<Stack className="ms-2" direction="horizontal" gap={3}>
			<IconDisplay Icon={IconEssence} tooltip="Value">
				<span>{formatNumber({ value: secondHandPrice })}</span>
			</IconDisplay>

			<Button
				onClick={() => {
					const { ID } = item

					transactEssence(secondHandPrice)

					if (isGearItem(item) || isRelicItem(item)) {
						toggleEquipItem({ forceUnequip: true, item })
					}

					setInventory(currentInventory =>
						currentInventory.filter(currentItem => currentItem.ID !== ID),
					)
					setMerchantInventory(currentMerchantInventory => [
						...currentMerchantInventory,
						{ ...item, isReturned: true },
					])

					progressQuest({ quest: "selling" })
				}}
				variant="outline-dark"
			>
				<span>Sell</span>
			</Button>
		</Stack>
	)
}
