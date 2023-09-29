import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Caravan/Mercenary/SkillDisplay";
import { TrainSkillButton } from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { hireStatus } from "@neverquest/state/caravan";
import { skillPrice, skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function TrainableSkill({ type }: { type: Skill }) {
  const { requiredCrew } = SKILLS[type];

  const skillPriceValue = useRecoilValue(skillPrice);
  const skillValue = useRecoilValue(skills(type));
  const { status } = useRecoilValue(hireStatus(requiredCrew));

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {status === "hired" ? (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <IconDisplay
              contents={formatValue({ value: skillPriceValue })}
              Icon={IconEssence}
              tooltip="Price"
            />

            <TrainSkillButton type={type} />
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
