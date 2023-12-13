import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay";
import { TrainSkillButton } from "@neverquest/components/Skills/TrainSkillButton";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { hireStatus } from "@neverquest/state/caravan";
import { isSkillAcquired, skillPrice } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function TrainableSkill({ skill }: { skill: Skill }) {
  const { requiredCrew } = SKILLS[skill];

  const hireStatusValue = useRecoilValue(hireStatus(requiredCrew));
  const isSkillAcquiredValue = useRecoilValue(isSkillAcquired(skill));
  const skillPriceValue = useRecoilValue(skillPrice);

  if (!isSkillAcquiredValue) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        {hireStatusValue === "hired" ? (
          <>
            <SkillDisplay skill={skill} />

            <Stack direction="horizontal" gap={3}>
              <IconDisplay Icon={IconEssence} tooltip="Price">
                {formatNumber({ value: skillPriceValue })}
              </IconDisplay>

              <TrainSkillButton skill={skill} />
            </Stack>
          </>
        ) : (
          <IconDisplay
            description="Unlocks when acquiring a crew member."
            Icon={IconUnknown}
            tooltip="Skill"
          >
            <span>{LABEL_UNKNOWN}</span>
          </IconDisplay>
        )}
      </div>
    );
  }
}
