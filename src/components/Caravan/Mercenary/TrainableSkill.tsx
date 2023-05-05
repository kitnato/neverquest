import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainSkillButton } from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import { SkillDisplay } from "@neverquest/components/Character/SkillDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { characterLevel } from "@neverquest/state/attributes";
import { skills } from "@neverquest/state/skills";
import type { SkillType } from "@neverquest/types/enums";

export function TrainableSkill({ type }: { type: SkillType }) {
  const characterLevelValue = useRecoilValue(characterLevel);
  const skillValue = useRecoilValue(skills(type));

  const { coinPrice, requiredLevel } = SKILLS[type];

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {requiredLevel <= characterLevelValue ? (
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
          description={`Unlocks at Power Level ${requiredLevel}`}
          Icon={IconUnknown}
          tooltip={LABEL_UNKNOWN}
        />
      )}
    </div>
  );
}
