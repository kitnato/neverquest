import { useRecoilCallback } from "recoil"

import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill"
import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer"
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { isAttacking } from "@neverquest/state/character"
import { location, progress, progressMaximum, stage } from "@neverquest/state/encounter"
import { isInexhaustible, isInvulnerable } from "@neverquest/state/reserves"
import { essenceLoot } from "@neverquest/state/resources"
import { SKILL_TYPES, type Skill } from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useCheatQuest() {
	const acquireSkill = useAcquireSkill()
	const generateMerchantOffer = useGenerateMerchantOffer()
	const increaseStage = useIncreaseStage()
	const resetWilderness = useResetWilderness()
	const setMonologues = useSetMonologues()
	const toggleAttacking = useToggleAttacking()
	const toggleLocation = useToggleLocation()
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
							acquireSkill(value)
						}

						break
					}
					// Source engine
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
			acquireSkill,
			generateMerchantOffer,
			increaseStage,
			resetWilderness,
			setMonologues,
			toggleAttacking,
			toggleLocation,
			transactEssence,
		],
	)
}
