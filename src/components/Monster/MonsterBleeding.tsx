import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { ReactComponent as IconBleeding } from "@neverquest/icons/drop.svg";
import { skills } from "@neverquest/state/skills";
import { bleedChance } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";

export function MonsterBleeding() {
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  if (!bleedSkill || bleedChanceValue === 0) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
