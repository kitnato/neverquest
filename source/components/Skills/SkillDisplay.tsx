import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { SKILLS } from "@neverquest/data/skills"
import type { Skill } from "@neverquest/types/unions"
import { capitalizeAll } from "@neverquest/utilities/formatters"

export function SkillDisplay({ skill }: { skill: Skill }) {
  const { description, descriptionIcons, Icon } = SKILLS[skill]

  return (
    <IconDisplay
      description={
        <DescriptionDisplay description={description} descriptionIcons={descriptionIcons} />
      }
      Icon={Icon}
      tooltip="Skill"
    >
      <span>{capitalizeAll(skill)}</span>
    </IconDisplay>
  )
}
