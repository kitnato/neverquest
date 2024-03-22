import type { FunctionComponent } from "react"
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
import { InfusionAppraise } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionAppraise"
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
import { isSkillAcquired } from "@neverquest/state/skills"
import type { Armor, Shield, Weapon } from "@neverquest/types"
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
import type { Relic } from "@neverquest/types/unions"
import { stackItems } from "@neverquest/utilities/helpers"

const RELIC_ACTIONS: Partial<Record<Relic, FunctionComponent>> = {
	"automincer": () => <EquipRelic relic="automincer" />,
	"compass": CompassNavigate,
	"dream catcher": () => <EquipRelic relic="dream catcher" />,
	"hearthstone": HearthstoneWarp,
}

export function Inventory() {
	const armorValue = useRecoilValue(armor)
	const inventoryValue = useRecoilValue(inventory)
	const isSkillAcquiredArchery = useRecoilValue(isSkillAcquired("archery"))
	const isSkillAcquiredArmorcraft = useRecoilValue(isSkillAcquired("armorcraft"))
	const isSkillAcquiredShieldcraft = useRecoilValue(isSkillAcquired("shieldcraft"))
	const isSkillAcquiredSiegecraft = useRecoilValue(isSkillAcquired("siegecraft"))
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)

	const equippableItems: Record<string, boolean> = {}

	for (const item of inventoryValue) {
		let canEquip
      = (isArmor(item) && armorValue.ID !== item.ID)
      || (isWeapon(item) && weaponValue.ID !== item.ID)
      || (isShield(item) && shieldValue.ID !== item.ID)

		if (isArmor(item) && item.gearClass === "heavy") {
			canEquip = isSkillAcquiredArmorcraft
		}

		if (isMelee(item) && item.grip === "two-handed") {
			canEquip = isSkillAcquiredSiegecraft
		}

		if (isRanged(item)) {
			canEquip = isSkillAcquiredArchery
		}

		if (isShield(item) && item.gearClass === "tower") {
			canEquip = isSkillAcquiredShieldcraft
		}

		equippableItems[item.ID] = canEquip
	}

	const toggleEquipItem = useToggleEquipItem()

	const equippedGear = [weaponValue, armorValue, shieldValue].filter(
		gearItem => isArmor(gearItem) || isShield(gearItem) || isWeapon(gearItem),
	) as (Armor | Shield | Weapon)[]
	const equippedGearIDs = new Set(equippedGear.map(({ ID }) => ID))
	const storedItems = inventoryValue.filter(
		({ ID, name }) => !equippedGearIDs.has(ID) && name !== "knapsack",
	)

	return (
		<Stack gap={5}>
			<div className="position-sticky">
				<Encumbrance />
			</div>

			<Stack gap={3}>
				<h6>Equipped</h6>

				{equippedGear.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

				{equippedGear.map((item) => {
					const { ID } = item

					return (
						<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
							<ItemDisplay item={item} />

							<Button
								className="ms-2"
								onClick={() => {
									toggleEquipItem({ item })
								}}
								variant="outline-dark"
							>
								<span>Unequip</span>
							</Button>
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
					.map((item) => {
						const { ID } = item
						const canEquipGear = equippableItems[ID]

						return (
							<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
								<ItemDisplay item={item} />

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
													toggleEquipItem({ item })
												}}
												variant="outline-dark"
											>
												<span>Equip</span>
											</Button>
										</div>
									</OverlayTrigger>

									<DiscardItem item={item} />
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
									<InfusionAppraise infusable={name} />

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
