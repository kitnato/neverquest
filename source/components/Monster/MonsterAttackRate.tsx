import { useRecoilValue, useSetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { MonsterAttackRateMeter } from "@neverquest/components/Monster/MonsterAttackRateMeter"
import { AILMENT_PENALTY } from "@neverquest/data/statistics"
import { useDefend } from "@neverquest/hooks/actions/useDefend"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { useTimer } from "@neverquest/hooks/useTimer"
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react"
import { isAttacking } from "@neverquest/state/character"
import {
	isMonsterAiling,
	isMonsterClose,
	isMonsterDead,
	monsterAttackDuration,
	monsterAttackRate,
} from "@neverquest/state/monster"

export function MonsterAttackRate() {
	const isMonsterCloseValue = useRecoilValue(isMonsterClose)
	const isAttackingValue = useRecoilValue(isAttacking)
	const isMonsterDeadValue = useRecoilValue(isMonsterDead)
	const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"))
	const setMonsterAttackDuration = useSetRecoilState(monsterAttackDuration)

	const defend = useDefend()

	useDeltaText({
		delta: "monsterAttackRate",
		format: "time",
		state: monsterAttackRate,
	})

	useTimer({
		factor: isMonsterFrozen ? 1 - AILMENT_PENALTY.frozen : 1,
		onElapsed: defend,
		setDuration: setMonsterAttackDuration,
		stop: !isAttackingValue || !isMonsterCloseValue || isMonsterDeadValue,
	})

	return (
		<IconDisplay Icon={IconMonsterAttackRate} tooltip="Monster attack rate">
			<MonsterAttackRateMeter />
		</IconDisplay>
	)
}
