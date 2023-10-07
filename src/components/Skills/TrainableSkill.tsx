import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay";
import { TrainSkillButton } from "@neverquest/components/Skills/TrainSkillButton";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { hireStatus } from "@neverquest/state/caravan";
import { skillPrice, skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function TrainableSkill({ skill }: { skill: Skill }) {
  const { requiredCrew } = SKILLS[skill];

  const skillPriceValue = useRecoilValue(skillPrice);
  const skillValue = useRecoilValue(skills(skill));
  const { status } = useRecoilValue(hireStatus(requiredCrew));

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {status === "hired" ? (
        <>
          <SkillDisplay skill={skill} />

          <Stack direction="horizontal" gap={3}>
            <IconDisplay
              contents={formatValue({ value: skillPriceValue })}
              Icon={IconEssence}
              tooltip="Price"
            />

            <TrainSkillButton skill={skill} />
          </Stack>
        </>
      ) : (
        <IconDisplay
          contents={LABEL_UNKNOWN}
          description="Unlocks when acquiring a crew member."
          Icon={IconUnknown}
          tooltip="Skill"
        />
      )}
    </div>
  );
}
