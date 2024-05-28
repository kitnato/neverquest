import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay"
import { LABEL_NONE } from "@neverquest/data/general"
import { trainedSkills } from "@neverquest/state/skills"
import { SKILL_TYPES } from "@neverquest/types/unions"

export function Skills() {
	const trainedSkillsValue = useRecoilValue(trainedSkills)

	return Object.values(trainedSkillsValue).every(hasTrainedSkill => !hasTrainedSkill)
		? <span className="fst-italic">{LABEL_NONE}</span>

		: (
			<Stack gap={3}>
				{SKILL_TYPES.map(
					skill => trainedSkillsValue[skill] && <SkillDisplay key={skill} skill={skill} />,
				)}
			</Stack>
		)
}
