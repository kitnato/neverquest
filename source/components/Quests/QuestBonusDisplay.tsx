import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import { questsBonus } from "@neverquest/state/quests"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { QuestBonus } from "@neverquest/types/unions"

export function QuestBonusDisplay({ bonus }: { bonus: QuestBonus }) {
	const questsBonusState = questsBonus(bonus)

	const questsBonusValue = useRecoilValue(questsBonusState)

	const { Icon, tooltip } = {
		damageBonus: { Icon: IconDamage, tooltip: "Total damage bonus" },
		healthBonus: { Icon: IconHealth, tooltip: "Total health bonus" },
		staminaBonus: { Icon: IconStamina, tooltip: "Total stamina bonus" },
	}[bonus]

	useDeltaText({
		delta: bonus,
		format: "percentage",
		state: questsBonusState,
	})

	return (
		<IconDisplay Icon={Icon} key={bonus} tooltip={tooltip}>
			<Stack direction="horizontal" gap={1}>
				<span>
					{formatNumber({
						format: "multiplier",
						value: questsBonusValue,
					})}
				</span>

				<DeltasDisplay delta={bonus} />
			</Stack>
		</IconDisplay>
	)
}
