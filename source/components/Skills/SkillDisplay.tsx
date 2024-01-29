import { Fragment } from "react";
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
          <span key={index}>{part}</span>
        ) : (
          <Fragment key={index}>
            <span>{part}</span>

            <IconImage className="small" Icon={descriptionIcon} />
          </Fragment>
        );
      })}
      Icon={Icon}
      tooltip="Skill"
    >
      <span>{capitalizeAll(skill)}</span>
    </IconDisplay>
  );
}
