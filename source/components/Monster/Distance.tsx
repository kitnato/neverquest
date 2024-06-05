import { useRecoilValue, useSetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { DistanceMeter } from "@neverquest/components/Monster/DistanceMeter"
import { useTimer } from "@neverquest/hooks/useTimer"
import IconDistance from "@neverquest/icons/distance.svg?react"
import { isAttacking } from "@neverquest/state/character"
import {
	distance,
	isMonsterClose,
	isMonsterDead,
	isMonsterDistant,
} from "@neverquest/state/monster"
import { range } from "@neverquest/state/statistics"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Distance() {
	const isAttackingValue = useRecoilValue(isAttacking)
	const isMonsterCloseValue = useRecoilValue(isMonsterClose)
	const isMonsterDeadValue = useRecoilValue(isMonsterDead)
	const isMonsterDistantValue = useRecoilValue(isMonsterDistant)
	const rangeValue = useRecoilValue(range)
	const setMonsterDistance = useSetRecoilState(distance)

	useTimer({
		factor: isAttackingValue ? 1 : -1,
		maximumDuration: rangeValue,
		setDuration: setMonsterDistance,
		stop:
			isMonsterDeadValue
			|| (isAttackingValue && isMonsterCloseValue)
			|| (!isAttackingValue && isMonsterDistantValue),
	})

	if (rangeValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconDistance}
				tooltip="Distance"
			>
				<DistanceMeter />
			</IconDisplay>
		)
	}
}
