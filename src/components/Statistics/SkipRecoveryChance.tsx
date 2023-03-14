import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconSkipRecovery } from "@neverquest/icons/peace-dove.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { skipRecoveryChance } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function SkipRecoveryChance() {
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));
  const skipRecoveryChanceValue = useRecoilValue(skipRecoveryChance);

  const deltaChanceSkipRecovery = deltas(DeltaType.ChanceSkipRecovery);

  useDeltaText({
    atomDelta: deltaChanceSkipRecovery,
    atomValue: skipRecoveryChance,
  });

  if (!armorsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(skipRecoveryChanceValue)}</span>

          <FloatingText type={DeltaType.ChanceSkipRecovery} />
        </>
      }
      Icon={IconSkipRecovery}
      isAnimated
      tooltip={MASTERIES[MasteryType.SkipRecoveryChance].name}
    />
  );
}
