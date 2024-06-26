import { nanoid } from "nanoid"
import { useRecoilCallback } from "recoil"

import { MERCHANT_OFFERS } from "@neverquest/data/caravan"
import { isOfferGenerated, merchantInventory } from "@neverquest/state/caravan"
import { stage, stageMaximum } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import { isGearItem, isInheritableItem } from "@neverquest/types/type-guards"
import {
	generateArmor,
	generateMeleeWeapon,
	generateShield,
} from "@neverquest/utilities/generators"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { GeneratorParameters } from "@kitnato/locran/build/types"
import type { InheritableItem } from "@neverquest/types"

export function useGenerateMerchantOffer() {
	return useRecoilCallback(
		({ set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const newMerchantInventory = [...get(merchantInventory)]
				const stageValue = get(stage)

				const merchantOffer = MERCHANT_OFFERS[stageValue]

				// Only add offer if it's the currently highest stage and it's not been generated before to avoid regenerating older gear offers.
				if (
					merchantOffer !== undefined
					&& stageValue === get(stageMaximum)
					&& !get(isOfferGenerated(stageValue))
				) {
					const { offer } = merchantOffer

					// In the case of being a relic or infusable, make sure it's not in any inventory.
					if (
						isInheritableItem(offer)
						&& (
							newMerchantInventory.some(({ name }) => name === offer.name)
							|| get(ownedItem(offer.name)) !== undefined
						)
					) {
						return
					}

					const gearSettings: GeneratorParameters & { level: number } = {
						affixStructure: "prefix",
						level: stageValue,
						prefixTags: ["lowQuality"],
					}

					const item = (() => {
						if ("type" in offer) {
							switch (offer.type) {
								case "armor": {
									return generateArmor({
										...gearSettings,
										...offer,
									})
								}

								case "shield": {
									return generateShield({
										...gearSettings,
										...offer,
									})
								}

								case "weapon": {
									return generateMeleeWeapon({
										...gearSettings,
										...offer,
									})
								}
							}
						}

						return { ...offer, ID: nanoid() } as InheritableItem
					})()

					if (isGearItem(item)) {
						item.price = Math.round(item.price / 2)
					}

					newMerchantInventory.push({
						...item,
						isReturned: false,
					})

					set(merchantInventory, newMerchantInventory)
					set(isOfferGenerated(stageValue), true)
				}
			},
		[],
	)
}
