import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconTenacity } from "@neverquest/icons/tenacity.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { tenacity } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Tenacity() {
  const armorsSkill = useRecoilValue(skills(SkillType.Armors));
  const tenacityValue = useRecoilValue(tenacity);

  const deltaTenacity = deltas(DeltaType.Tenacity);

  useDeltaText({
    atomDelta: deltaTenacity,
    atomValue: tenacity,
  });

  if (!armorsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(tenacityValue)}</span>

          <FloatingText type={DeltaType.Tenacity} />
        </>
      }
      Icon={IconTenacity}
      isAnimated
      tooltip={MASTERIES[MasteryType.Tenacity].name}
    />
  );
}
