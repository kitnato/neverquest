import { nanoid } from "nanoid"
import { useRecoilCallback } from "recoil"

import { RELICS, RELIC_DROP_CHANCE } from "@neverquest/data/items"
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer"
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
import { type Relic, SKILL_TYPES, type Skill } from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useCheatQuest() {
	const acquireItem = useAcquireItem()
	const generateMerchantOffer = useGenerateMerchantOffer()
	const increaseStage = useIncreaseStage()
	const resetWilderness = useResetWilderness()
	const setMonologues = useSetMonologues()
	const toggleAttacking = useToggleAttacking()
	const toggleLocation = useToggleLocation()
	const trainSkill = useTrainSkill()
	const transactEssence = useTransactEssence()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ cheat, value }: { cheat: string, value?: Skill | number }) => {
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
						if (typeof value === "string" && SKILL_TYPES.includes(value)) {
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
