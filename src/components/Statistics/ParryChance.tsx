import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconParryChance } from "@neverquest/icons/parry-chance.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { parryChance } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function ParryChance() {
  const parryChanceValue = useRecoilValue(parryChance);
  const parrySkill = useRecoilValue(skills(SkillType.Parry));

  const deltaParryChance = deltas(DeltaType.ParryChance);

  useDeltaText({
    atomDelta: deltaParryChance,
    atomValue: parryChance,
  });

  if (!parrySkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(parryChanceValue)}</span>

          <FloatingText type={DeltaType.ParryChance} />
        </>
      }
      Icon={IconParryChance}
      isAnimated
      tooltip="Parry chance"
    />
  );
}
