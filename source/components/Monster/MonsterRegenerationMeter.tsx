import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { MONSTER_REGENERATION } from "@neverquest/data/monster"
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react"
import { isMonsterAiling, monsterRegenerationDuration } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function MonsterRegenerationMeter({ amount }: { amount: number }) {
	const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"))
	const monsterRegenerationDurationValue = useRecoilValue(monsterRegenerationDuration)

	const { duration, ticks } = MONSTER_REGENERATION
	const monsterRegenerationRate = Math.round(duration / ticks)
	const regenerationProgress = monsterRegenerationDurationValue === 0 ? 0 : monsterRegenerationRate - monsterRegenerationDurationValue

	return (
		<LabelledProgressBar
			attachment="above"
			disableTransitions
			isSmall
			value={(regenerationProgress / monsterRegenerationRate) * PERCENTAGE_POINTS}
			variant="secondary"
		>
			{(() => {
				if (isMonsterBurning) {
					return <span>Burning ...</span>
				}

				if (regenerationProgress === 0) {
					return (
						<Stack>
							<span>Monster regeneration</span>

							<IconDisplay Icon={IconMonsterHealth} iconProps={{ className: "small" }}>
								<span>
									{amount}
									{" per "}
									{formatNumber({
										format: "time",
										value: monsterRegenerationRate,
									})}
								</span>
							</IconDisplay>
						</Stack>
					)
				}

				return (
					<Stack>
						<span>Regenerating</span>

						<IconDisplay Icon={IconMonsterHealth} iconProps={{ className: "small" }}>
							<span>
								{amount}
								{" in "}
								{formatNumber({
									format: "time",
									value: monsterRegenerationRate - regenerationProgress,
								})}
							</span>
						</IconDisplay>
					</Stack>
				)
			})()}
		</LabelledProgressBar>
	)
}
