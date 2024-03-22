import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill"
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general"
import { TEARS_MAXIMUM } from "@neverquest/data/items"
import { SKILLS } from "@neverquest/data/skills"
import IconLacrimatory from "@neverquest/icons/lacrimatory.svg?react"
import { tears } from "@neverquest/state/items"
import { acquiredSkills } from "@neverquest/state/skills"
import { SKILL_TYPES } from "@neverquest/types/unions"

export function AcquireWitchSkill() {
	const acquiredSkillsValue = useRecoilValue(acquiredSkills)
	const tearsValue = useRecoilValue(tears)

	const availableSkills = SKILL_TYPES.filter(
		skill => SKILLS[skill].trainer === "witch" && !acquiredSkillsValue[skill],
	)

	return (
		<Stack gap={3}>
			<h6>Acquire skill</h6>

			{availableSkills.length === 0
				? (
					<span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
				)
				: (tearsValue < TEARS_MAXIMUM
					? (
						<span>
							&quot;Before I can impart protective hexes, you must first taste the bitter tears of
							experience.&quot;
						</span>
					)
					: (
						<>
							<IconDisplay Icon={IconLacrimatory} iconProps={{ className: "small" }}>
								<span>
									&quot;Your pernicious traumas resonate with the cipher. You are ready.&quot;
								</span>
							</IconDisplay>

							{availableSkills.map(skill => (
								<TrainableSkill key={skill} skill={skill} />
							))}
						</>
					))}
		</Stack>
	)
}
