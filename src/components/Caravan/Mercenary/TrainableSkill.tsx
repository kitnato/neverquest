import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import TrainSkillButton from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import Coins from "@neverquest/components/Resource/Coins";
import { UNKNOWN } from "@neverquest/constants";
import { SKILLS } from "@neverquest/constants/skills";
import { skills } from "@neverquest/state/skills";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const skillValue = useRecoilValue(skills(type));

  return (
    <div className="align-items-center d-flex justify-content-between w-100">
      {skillValue !== SkillStatus.Trainable ? (
        UNKNOWN
      ) : (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <Coins tooltip="Price (coins)" value={SKILLS[type].price} />

            <TrainSkillButton type={type} />
          </Stack>
        </>
      )}
    </div>
  );
}
