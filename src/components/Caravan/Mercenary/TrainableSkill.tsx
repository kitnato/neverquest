import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import TrainSkillButton from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import Coins from "@neverquest/components/Resource/Coins";
import { SKILLS } from "@neverquest/constants/skills";
import { skills } from "@neverquest/state/skills";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const skillValue = useRecoilValue(skills(type));

  if (skillValue === SkillStatus.Trainable) {
    return (
      <div className="align-items-center d-flex justify-content-between w-100">
        <SkillDisplay type={type} />

        <Stack direction="horizontal" gap={3}>
          <Coins tooltip="Price (coins)" value={SKILLS[type].price} />

          <TrainSkillButton type={type} />
        </Stack>
      </div>
    );
  }

  return null;
}
