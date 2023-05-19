import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterBleedingMeter } from "@neverquest/components/Monster/MonsterBleedingMeter";
import { ReactComponent as IconBleeding } from "@neverquest/icons/bleeding.svg";
import { skills } from "@neverquest/state/skills";
import { bleed } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";

export function MonsterBleeding() {
  const bleedValue = useRecoilValue(bleed);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  if (!bleedSkill || bleedValue === 0) {
    return null;
  }

  return <IconDisplay contents={<MonsterBleedingMeter />} Icon={IconBleeding} tooltip="Bleeding" />;
}
