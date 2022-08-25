import { useRecoilValue } from "recoil";

import { skills } from "@neverquest/state/skills";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const skillValue = useRecoilValue(skills(type));

  if (skillValue === SkillStatus.Trained) {
    return <SkillDisplay type={type} />;
  }

  return null;
}
