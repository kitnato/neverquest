import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/peace-dove.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { skipRecoveryChance } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const skipRecoveryChanceValue = useRecoilValue(skipRecoveryChance);
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));

  const deltaChanceSkipRecovery = deltas(DeltaType.ChanceSkipRecovery);

  useDeltaText({
    deltaAtom: deltaChanceSkipRecovery,
    valueAtom: skipRecoveryChance,
  });

  if (!armorsSkill) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={
        <>
          <span>{formatPercentage(skipRecoveryChanceValue)}</span>

          <FloatingText atom={deltaChanceSkipRecovery} />
        </>
      }
      Icon={Icon}
      tooltip="Chance to skip recovery"
    />
  );
}
