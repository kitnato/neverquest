import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill"
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general"
import { SKILLS } from "@neverquest/data/skills"
import IconDreamCatcher from "@neverquest/icons/dream-catcher.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { trainedSkills } from "@neverquest/state/skills"
import { SKILL_TYPES } from "@neverquest/types/unions"

export function TrainOccultistSkill() {
	const trainedSkillsValue = useRecoilValue(trainedSkills)
	const ownedItemDreamCatcher = useRecoilValue(ownedItem("dream catcher"))

	const availableSkills = SKILL_TYPES.filter(
		skill => SKILLS[skill].trainer === "occultist" && !trainedSkillsValue[skill],
	)

	return (
		<Stack gap={3}>
			<h6>Train skill</h6>

			{availableSkills.length === 0
				? <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>

				: ownedItemDreamCatcher === undefined
					? (
						<span>
							&quot;There exists tremendous power in dreams, one must but find a medium to harness
							them.&quot;
						</span>
					)
					: (
						<>
							<IconDisplay Icon={IconDreamCatcher} iconProps={{ className: "small" }}>
								<span>&quot;The cipher sings.&quot;</span>
							</IconDisplay>

							{availableSkills.map(skill =>
								<TrainableSkill key={skill} skill={skill} />,
							)}
						</>
					)}
		</Stack>
	)
}
