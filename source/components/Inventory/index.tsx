import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { Antidote } from "@neverquest/components/Inventory/Consumable/Antidote"
import { Bandages } from "@neverquest/components/Inventory/Consumable/Bandages"
import { Elixir } from "@neverquest/components/Inventory/Consumable/Elixir"
import { Salve } from "@neverquest/components/Inventory/Consumable/Salve"
import { DiscardItem } from "@neverquest/components/Inventory/DiscardItem"
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance"
import { CompassNavigate } from "@neverquest/components/Inventory/Inheritable/CompassNavigate"
import { EquipRelic } from "@neverquest/components/Inventory/Inheritable/EquipRelic"
import { HearthstoneWarp } from "@neverquest/components/Inventory/Inheritable/HearthstoneWarp"
import { Infusion } from "@neverquest/components/Inventory/Inheritable/Infusion"
import { SemperServatis } from "@neverquest/components/Inventory/Inheritable/SemperServatis"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { SocketGem } from "@neverquest/components/Inventory/SocketGem"
import {
	CLASS_FULL_WIDTH_JUSTIFIED,
	LABEL_SKILL_REQUIRED,
	POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { equippedRelics } from "@neverquest/state/items"
import { isSkillTrained } from "@neverquest/state/skills"
import {
	isArmor,
	isConsumableItem,
	isGearItem,
	isGemItem,
	isInfusableItem,
	isMelee,
	isRanged,
	isRelicItem,
	isShield,
	isWeapon,
} from "@neverquest/types/type-guards"
import { stackItems } from "@neverquest/utilities/helpers"

import type { Armor, Shield, Weapon } from "@neverquest/types"
import type { Relic } from "@neverquest/types/unions"
import type { FunctionComponent } from "preact"

const RELIC_ACTIONS: Partial<Record<Relic, FunctionComponent>> = {
	"[S751NQ]": SemperServatis,
	"automincer": () => <EquipRelic relic="automincer" />,
	"compass": CompassNavigate,
	"dream catcher": () => <EquipRelic relic="dream catcher" />,
	"hearthstone": HearthstoneWarp,
	"war mask": () => <EquipRelic relic="war mask" />,
}

export function Inventory() {
	const armorValue = useRecoilValue(armor)
	const equippedRelicsValue = useRecoilValue(equippedRelics)
	const inventoryValue = useRecoilValue(inventory)
	const isSkillTrainedArchery = useRecoilValue(isSkillTrained("archery"))
	const isSkillTrainedArmorcraft = useRecoilValue(isSkillTrained("armorcraft"))
	const isSkillTrainedShieldcraft = useRecoilValue(isSkillTrained("shieldcraft"))
	const isSkillTrainedSiegecraft = useRecoilValue(isSkillTrained("siegecraft"))
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)

	const equippableItems: Record<string, boolean> = {}

	for (const item of inventoryValue) {
		let canEquip = (isArmor(item) && armorValue.ID !== item.ID)
			|| (isWeapon(item) && weaponValue.ID !== item.ID)
			|| (isShield(item) && shieldValue.ID !== item.ID)

		if (isArmor(item) && item.gearClass === "heavy") {
			canEquip = isSkillTrainedArmorcraft
		}

		if (isMelee(item) && item.grip === "two-handed") {
			canEquip = isSkillTrainedSiegecraft
		}

		if (isRanged(item)) {
			canEquip = isSkillTrainedArchery
		}

		if (isShield(item) && item.gearClass === "tower") {
			canEquip = isSkillTrainedShieldcraft
		}

		equippableItems[item.ID] = canEquip
	}

	const toggleEquipItem = useToggleEquipItem()

	const equippedGear = [weaponValue, armorValue, shieldValue].filter(
		gearItem => isArmor(gearItem) || isShield(gearItem) || isWeapon(gearItem),
	) as (Armor | Shield | Weapon)[]
	const equippedRelicItems = inventoryValue
		.filter(isRelicItem)
		.filter(item => equippedRelicsValue[item.name])
		.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
	const equippedItems = [...equippedGear, ...equippedRelicItems]
	const equippedItemIDs = new Set(equippedItems.map(({ ID }) => ID))
	const storedItems = inventoryValue.filter(({ ID }) => !equippedItemIDs.has(ID))

	return (
		<Stack gap={5}>
			<div className="position-sticky">
				<Encumbrance />
			</div>

			<Stack gap={3}>
				<h6>Equipped</h6>

				{equippedItems.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

				{equippedGear.map((gearItem) => {
					const { ID } = gearItem

					return (
						<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
							<ItemDisplay item={gearItem} />

							<Button
								className="ms-2"
								onClick={() => {
									toggleEquipItem({ item: gearItem })
								}}
								variant="outline-dark"
							>
								<span>Unequip</span>
							</Button>
						</div>
					)
				})}

				{equippedRelicItems.map((relicItem) => {
					const { ID, name } = relicItem
					const Action = RELIC_ACTIONS[name]

					return (
						<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
							<ItemDisplay item={relicItem} />

							{Action !== undefined && <Action />}
						</div>
					)
				})}
			</Stack>

			<Stack gap={3}>
				<h6>Stored</h6>

				{storedItems.length === 0 && <span className="fst-italic">Nothing stored.</span>}

				{storedItems
					.filter(isGearItem)
					.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
					.map((gearItem) => {
						const { ID } = gearItem
						const canEquipGear = equippableItems[ID]

						return (
							<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
								<ItemDisplay item={gearItem} />

								<Stack className="ms-2" direction="horizontal" gap={3}>
									<OverlayTrigger
										overlay={(
											<Tooltip>
												<span>{LABEL_SKILL_REQUIRED}</span>
											</Tooltip>
										)}
										trigger={canEquipGear ? [] : POPOVER_TRIGGER}
									>
										<div>
											<Button
												disabled={!canEquipGear}
												onClick={() => {
													toggleEquipItem({ item: gearItem })
												}}
												variant="outline-dark"
											>
												<span>Equip</span>
											</Button>
										</div>
									</OverlayTrigger>

									<DiscardItem item={gearItem} />
								</Stack>
							</div>
						)
					})}

				{[
					...stackItems(
						storedItems
							.filter(isConsumableItem)
							.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
					),
					...stackItems(
						storedItems
							.filter(isGemItem)
							.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
					),
				].map(({ amount, item }) => {
					const { ID, name } = item

					return (
						<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
							<ItemDisplay amount={amount} item={item} />

							<Stack className="ms-2" direction="horizontal" gap={3}>
								{(() => {
									switch (name) {
										case "antidote": {
											return <Antidote ID={ID} />
										}
										case "bandages": {
											return <Bandages ID={ID} />
										}
										case "elixir": {
											return <Elixir ID={ID} />
										}
										case "salve": {
											return <Salve ID={ID} />
										}
										case "phylactery": {
											return
										}
										default: {
											return <SocketGem gem={item} />
										}
									}
								})()}

								<DiscardItem item={item} />
							</Stack>
						</div>
					)
				})}

				{storedItems
					.filter(isInfusableItem)
					.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
					.map((infusableItem) => {
						const { ID, name } = infusableItem

						return (
							<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
								<ItemDisplay item={infusableItem} />

								<Stack className="ms-2" direction="horizontal" gap={3}>
									<Infusion infusable={name} />

									<DiscardItem item={infusableItem} />
								</Stack>
							</div>
						)
					})}

				{storedItems
					.filter(isRelicItem)
					.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
					.map((relicItem) => {
						const { ID, name } = relicItem
						const Action = RELIC_ACTIONS[name]

						return (
							<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
								<ItemDisplay item={relicItem} />

								<Stack className="ms-2" direction="horizontal" gap={3}>
									{Action !== undefined && <Action />}

									<DiscardItem item={relicItem} />
								</Stack>
							</div>
						)
					})}
			</Stack>
		</Stack>
	)
}
