import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterBleedMeter from "@neverquest/components/Monster/MonsterBleedMeter";
import { ReactComponent as Icon } from "@neverquest/icons/drop.svg";
import { skills } from "@neverquest/state/skills";
import { bleedChance } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";

export default function () {
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  if (!bleedSkill || bleedChanceValue === 0) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedMeter />} Icon={Icon} tooltip="Bleeding" />;
}
