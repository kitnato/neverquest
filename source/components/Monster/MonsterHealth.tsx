import { Stack } from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter"
import { MonsterRegeneration } from "@neverquest/components/Monster/MonsterRegeneration"
import { LABEL_MAXIMUM } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react"
import { monsterHealthMaximum } from "@neverquest/state/monster"

export function MonsterHealth() {
	useDeltaText({
		delta: "monsterHealthMaximum",
		state: monsterHealthMaximum,
		suffix: LABEL_MAXIMUM,
	})

	return (
		<IconDisplay Icon={IconMonsterHealth} tooltip="Monster health">
			<Stack>
				<MonsterHealthMeter />

				<MonsterRegeneration />
			</Stack>
		</IconDisplay>
	)
}
