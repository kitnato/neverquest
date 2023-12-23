import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { SKILLS } from "@neverquest/data/skills";
import type { Skill } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SkillDisplay({ skill }: { skill: Skill }) {
  const { description, descriptionIcons, Icon } = SKILLS[skill];

  return (
    <IconDisplay
      description={description.split("#").map((part, index) => {
        const descriptionIcon = descriptionIcons[index];

        return descriptionIcon === undefined ? (
          <span>{part}</span>
        ) : (
          <>
            <span>{part}</span>

            <IconImage className="small" Icon={descriptionIcon} />
          </>
        );
      })}
      Icon={Icon}
      tooltip="Skill"
    >
      {capitalizeAll(skill)}
    </IconDisplay>
  );
}
