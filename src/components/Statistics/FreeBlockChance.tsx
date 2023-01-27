import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/static-guard.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { freeBlockChance } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function FreeBlockChance() {
  const freeBlockChanceValue = useRecoilValue(freeBlockChance);
  const shieldsSkill = useRecoilValue(skills(SkillType.Shields));

  const deltaChanceFreeBlock = deltas(DeltaType.ChanceFreeBlock);

  useDeltaText({
    atomDelta: deltaChanceFreeBlock,
    atomValue: freeBlockChance,
  });

  if (!shieldsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(freeBlockChanceValue)}</span>

          <FloatingText type={DeltaType.ChanceFreeBlock} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip={MASTERIES[MasteryType.FreeBlockChance].name}
    />
  );
}
