import { useRecoilValue } from "recoil"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general"
import { TRAITS } from "@neverquest/data/traits"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import { trainedSkills } from "@neverquest/state/skills"
import { capitalizeAll } from "@neverquest/utilities/formatters"

import type { Trait } from "@neverquest/types/unions"

export function TraitDisplay({ trait }: { trait: Trait }) {
	const trainedSkillsValue = useRecoilValue(trainedSkills)

	const { description, descriptionIcons, Icon, requiredSkill } = TRAITS[trait]
	const name = capitalizeAll(trait)

	if (requiredSkill === undefined || trainedSkillsValue[requiredSkill]) {
		return (
			<IconDisplay
				description={
					<DescriptionDisplay description={description} descriptionIcons={descriptionIcons} />
				}
				Icon={Icon}
				tooltip="Trait"
			>
				<span>{name}</span>
			</IconDisplay>
		)
	}

	return (
		<IconDisplay
			description={<span>{LABEL_SKILL_REQUIRED}</span>}
			Icon={IconUnknown}
			tooltip="Trait"
		>
			<span>{LABEL_UNKNOWN}</span>
		</IconDisplay>
	)
}
