import { useRecoilCallback } from "recoil"

import { AILMENT_PENALTY, LOOTING_RATE } from "@neverquest/data/statistics"
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { powerLevel } from "@neverquest/state/attributes"
import { attackDuration, encounter, lootingDuration, stage } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import {
	distance,
	isEnraged,
	isMonsterAiling,
	monsterAttackDuration,
	monsterHealth,
	monsterHealthMaximum,
	monsterRegenerationDuration,
} from "@neverquest/state/monster"
import { isHealthLow } from "@neverquest/state/reserves"
import { acquiredTraits } from "@neverquest/state/traits"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { DeltaReserve } from "@neverquest/types/ui"

export function useChangeMonsterHealth() {
	const addDelta = useAddDelta()
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({
				contents,
				damageType,
				value,
			}: DeltaReserve & {
				damageType?: "bleeding" | "critical" | "execution" | "parry" | "thorns"
			}) => {
				const get = getSnapshotGetter(snapshot)

				const deltaDisplay
					= contents === undefined ? [] : Array.isArray(contents) ? contents : [contents]
				const isPositive = value > 0
				const totalValue = !isPositive && get(isMonsterAiling("shocked")) ? Math.round(value * (1 + AILMENT_PENALTY.shocked)) : value
				const formattedValue = formatNumber({ value: totalValue })
				const monsterHealthValue = get(monsterHealth)
				const monsterHealthMaximumValue = get(monsterHealthMaximum)

				let newHealth = Math.min(monsterHealthValue + totalValue, monsterHealthMaximumValue)

				if (newHealth <= 0) {
					newHealth = 0

					reset(attackDuration)
					reset(monsterAttackDuration)
					reset(monsterRegenerationDuration)

					set(
						lootingDuration,
						LOOTING_RATE[get(ownedItem("ender hook")) === undefined ? "base" : "ender hook"],
					)

					if (get(distance) > 0) {
						progressQuest({ quest: "distantKilling" })
					}

					if (get(isEnraged)) {
						progressQuest({ quest: "killingEnraged" })
					}

					if (get(isHealthLow)) {
						progressQuest({ quest: "killingLowHealth" })
					}

					switch (get(encounter)) {
						case "boss": {
							progressQuest({ quest: "killingBoss" })
							break
						}

						case "monster": {
							progressQuest({ quest: "killing" })
							progressQuest({ quest: "killingStage" })
							break
						}

						case "res cogitans": {
							progressQuest({ quest: "killingResCogitans" })
							break
						}

						case "res dominus": {
							progressQuest({ quest: "killingResDominus" })

							if (Object.values(get(acquiredTraits)).every(isAcquired => !isAcquired)) {
								progressQuest({ quest: "killingResDominusNoTraits" })
							}
							break
						}

						case "void": {
							break
						}
					}

					switch (damageType) {
						case "bleeding": {
							progressQuest({ quest: "bleedingKill" })
							break
						}

						case "critical": {
							progressQuest({ quest: "criticalKilling" })
							break
						}

						case "execution": {
							progressQuest({ quest: "executing" })
							break
						}

						case "parry": {
							progressQuest({ quest: "parryingKill" })
							break
						}

						case "thorns": {
							progressQuest({ quest: "thornsKill" })
							break
						}

						default: {
							if (
								monsterHealthValue === monsterHealthMaximumValue
								&& get(powerLevel) <= get(stage)
							) {
								progressQuest({ quest: "killingOneStrike" })
							}
						}
					}
				}

				if (newHealth >= monsterHealthMaximumValue) {
					newHealth = monsterHealthMaximumValue

					reset(monsterRegenerationDuration)
				}

				set(monsterHealth, newHealth)

				if (value !== 0) {
					deltaDisplay.push({
						color: isPositive ? "text-success" : "text-danger",
						value: isPositive ? `+${formattedValue}` : formattedValue,
					})
				}

				addDelta({
					contents: deltaDisplay,
					delta: "monsterHealth",
				})
			},
		[addDelta, progressQuest],
	)
}
