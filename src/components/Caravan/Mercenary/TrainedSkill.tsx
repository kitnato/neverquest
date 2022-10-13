import { useRecoilValue } from "recoil";

import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import { skills } from "@neverquest/state/skills";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const skillValue = useRecoilValue(skills(type));

  if (skillValue !== SkillStatus.Trained) {
    return null;
  }

  return <SkillDisplay type={type} />;
}
