import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainSkillButton } from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import { SkillDisplay } from "@neverquest/components/Character/SkillDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { level } from "@neverquest/state/attributes";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/enums";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";

export function TrainableSkill({ type }: { type: Skill }) {
  const levelValue = useRecoilValue(level);
  const skillValue = useRecoilValue(skills(type));

  const { coinPrice, requiredLevel } = SKILLS[type];

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {requiredLevel <= levelValue ? (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <Coins tooltip="Price (coins)" value={coinPrice} />

            <TrainSkillButton type={type} />
          </Stack>
        </>
      ) : (
        <IconDisplay
          contents={LABEL_UNKNOWN}
          description={`Unlocks at level ${requiredLevel}`}
          Icon={IconUnknown}
          tooltip={LABEL_UNKNOWN}
        />
      )}
    </div>
  );
}
