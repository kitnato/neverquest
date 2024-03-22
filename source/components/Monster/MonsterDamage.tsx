import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { MonsterDamagePerSecond } from "@neverquest/components/Monster/MonsterDamagePerSecond"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react"
import { monsterDamage, monsterDamageAiling } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function MonsterDamage() {
	const monsterDamageValue = useRecoilValue(monsterDamage)
	const monsterDamageAilingValue = useRecoilValue(monsterDamageAiling)

	useDeltaText({
		delta: "monsterDamage",
		state: monsterDamage,
	})

	return (
		<IconDisplay
			className={`text-nowrap ${getAnimationClass({ animation: "flipInX" })}`}
			description={<MonsterDamagePerSecond />}
			Icon={IconMonsterDamage}
			tooltip="Monster damage"
		>
			<Stack direction="horizontal" gap={1}>
				<span>{formatNumber({ value: monsterDamageAilingValue })}</span>

				{monsterDamageValue !== monsterDamageAilingValue && (
					<>
						{LABEL_SEPARATOR}

						<span>{`(${formatNumber({ value: monsterDamageValue })})`}</span>
					</>
				)}

				<DeltasDisplay delta="monsterDamage" />
			</Stack>
		</IconDisplay>
	)
}
