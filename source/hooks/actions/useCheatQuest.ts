import { nanoid } from "nanoid"
import { useRecoilCallback } from "recoil"

import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { RELICS, RELIC_DROP_CHANCE } from "@neverquest/data/items"
import { MASTERY_PROGRESS_MAXIMUM } from "@neverquest/data/masteries"
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer"
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery"
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation"
import { useTrainSkill } from "@neverquest/hooks/actions/useTrainSkill"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { isAttacking, location, progress, progressMaximum, stage } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import { isInexhaustible, isInvulnerable } from "@neverquest/state/reserves"
import { essenceLoot } from "@neverquest/state/resources"
import { isMastery, isSkill } from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Relic } from "@neverquest/types/unions"

export function useCheatQuest() {
	const acquireItem = useAcquireItem()
	const generateMerchantOffer = useGenerateMerchantOffer()
	const increaseMastery = useIncreaseMastery()
	const increaseStage = useIncreaseStage()
	const resetWilderness = useResetWilderness()
	const setMonologues = useSetMonologues()
	const toggleAttacking = useToggleAttacking()
	const toggleLocation = useToggleLocation()
	const trainSkill = useTrainSkill()
	const transactEssence = useTransactEssence()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ cheat, value }: { cheat: string, value?: number | string }) => {
				const get = getSnapshotGetter(snapshot)

				const isAttackingValue = get(isAttacking)
				const progressMaximumValue = get(progressMaximum)
				const stageValue = get(stage)

				switch (cheat) {
					// Deus Ex
					case "allenergy": {
						set(isInexhaustible, isCurrentlyInexhaustible => !isCurrentlyInexhaustible)

						break
					}
					// Doom
					case "IDBEHOLDV": {
						set(isInvulnerable, isCurrentlyInvulnerable => !isCurrentlyInvulnerable)

						break
					}
					// Heretic
					case "gimmee": {
						if (isSkill(value)) {
							trainSkill(value)
						}

						break
					}
					// Grand Theft Auto 3
					case "GUNSGUNSGUNS": {
						Object.keys(RELIC_DROP_CHANCE).forEach((relic) => {
							if (get(ownedItem(relic as Relic)) === undefined) {
								acquireItem({ ...RELICS[relic as Relic].item, ID: nanoid() })
							}
						})

						break
					}
					// Half-life
					case "noclip": {
						if (isAttackingValue) {
							toggleAttacking()
						}

						set(progress, progressMaximumValue)

						break
					}
					// Starcraft
					case "something for nothing": {
						if (typeof value === "number" && Number.isInteger(value)) {
							transactEssence(value)
						}

						break
					}
					// Thief
					case "starting_mission": {
						if (typeof value === "number" && Number.isInteger(value) && value > stageValue) {
							const difference = value - stageValue

							if (get(location) === "wilderness") {
								if (isAttackingValue) {
									toggleAttacking()
								}

								reset(essenceLoot)
								toggleLocation()
							}

							for (let step = 0; step < difference; step++) {
								generateMerchantOffer()
								setMonologues()
								increaseStage()
							}

							resetWilderness()
						}

						break
					}
					// Age of Empires
					case "STEROIDS": {
						if (isMastery(value)) {
							for (let count = 0; count < LEVELLING_MAXIMUM * MASTERY_PROGRESS_MAXIMUM; count++) {
								increaseMastery(value)
							}
						}

						break
					}

					default: {
						console.warn("Some doors are better left unopened ...")

						return
					}
				}
			},
		[
			generateMerchantOffer,
			increaseStage,
			resetWilderness,
			setMonologues,
			toggleAttacking,
			toggleLocation,
			trainSkill,
			transactEssence,
		],
	)
}
