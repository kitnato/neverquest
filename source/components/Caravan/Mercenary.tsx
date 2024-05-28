import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay"
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill"
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general"
import { SKILLS } from "@neverquest/data/skills"
import { trainedSkills } from "@neverquest/state/skills"
import { SKILL_TYPES } from "@neverquest/types/unions"

export function Mercenary() {
	const trainedSkillsValue = useRecoilValue(trainedSkills)

	const trainableMercenarySkills = SKILL_TYPES.filter(
		skill => SKILLS[skill].trainer === "mercenary" && !trainedSkillsValue[skill],
	)
	const trainedMercenarySkills = SKILL_TYPES.filter(
		skill => SKILLS[skill].trainer === "mercenary" && trainedSkillsValue[skill],
	)

	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Train skills</h6>

				{trainableMercenarySkills.length === 0
					? <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>

					: trainableMercenarySkills.map(skill => <TrainableSkill key={skill} skill={skill} />)}
			</Stack>

			{trainedMercenarySkills.length > 0 && (
				<Stack gap={3}>
					<h6>Trained skills</h6>

					{trainedMercenarySkills.map(skill =>
						<SkillDisplay key={skill} skill={skill} />,
					)}
				</Stack>
			)}
		</Stack>
	)
}
