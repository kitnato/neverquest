import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { LABEL_NO_ESSENCE, POPOVER_TRIGGER } from "@neverquest/data/general"
import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { essence } from "@neverquest/state/resources"
import { skillPrice } from "@neverquest/state/skills"
import type { Skill } from "@neverquest/types/unions"

export function TrainSkillButton({ skill }: { skill: Skill }) {
	const essenceValue = useRecoilValue(essence)
	const skillPriceValue = useRecoilValue(skillPrice)

	const acquireSkill = useAcquireSkill()
	const transactEssence = useTransactEssence()

	const isAffordable = skillPriceValue <= essenceValue

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>{LABEL_NO_ESSENCE}</span>
				</Tooltip>
			)}
			trigger={isAffordable ? [] : POPOVER_TRIGGER}
		>
			<div>
				<Button
					disabled={!isAffordable}
					onClick={() => {
						acquireSkill(skill)
						transactEssence(-skillPriceValue)
					}}
					variant="outline-dark"
				>
					<span>Train</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}
