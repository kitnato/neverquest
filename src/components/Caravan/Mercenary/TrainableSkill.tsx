import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainSkillButton } from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import { SkillDisplay } from "@neverquest/components/Character/SkillDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resource/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/constants";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconUnknown } from "@neverquest/icons/perspective-dice-six-faces-random.svg";
import { characterLevel } from "@neverquest/state/character";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";

export function TrainableSkill({ type }: { type: SkillType }) {
  const characterLevelValue = useRecoilValue(characterLevel);
  const skillValue = useRecoilValue(skills(type));

  const { price, requiredLevel } = SKILLS[type];

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {requiredLevel <= characterLevelValue ? (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <Coins tooltip="Price (coins)" value={price} />

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
