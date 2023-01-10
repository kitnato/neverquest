import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/sword-clash.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { parryChance } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
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
      animation={AnimationType.FlipInX}
      contents={
        <>
          <span>{formatPercentage(parryChanceValue)}</span>

          <FloatingText atom={deltaParryChance} />
        </>
      }
      Icon={Icon}
      tooltip="Parry chance"
    />
  );
}
