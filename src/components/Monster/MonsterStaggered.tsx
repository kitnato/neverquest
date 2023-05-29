import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { ReactComponent as IconStaggered } from "@neverquest/icons/monster-staggered.svg";
import { skills } from "@neverquest/state/skills";
import { staggerDuration } from "@neverquest/state/statistics";
import { Skill } from "@neverquest/types/enums";

export function MonsterStaggered() {
  const skillTraumatology = useRecoilValue(skills(Skill.Traumatology));
  const staggerDurationValue = useRecoilValue(staggerDuration);

  if (!skillTraumatology || staggerDurationValue === 0) {
    return null;
  }

  return (
    <IconDisplay contents={<MonsterStaggeredMeter />} Icon={IconStaggered} tooltip="Staggered" />
  );
}
