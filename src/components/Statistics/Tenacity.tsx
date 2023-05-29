import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconTenacity } from "@neverquest/icons/tenacity.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { tenacity } from "@neverquest/state/statistics";
import { Delta, Mastery, Skill } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Tenacity() {
  const skillArmorcraft = useRecoilValue(skills(Skill.Armorcraft));
  const tenacityValue = useRecoilValue(tenacity);

  const deltaTenacity = deltas(Delta.Tenacity);

  useDeltaText({
    atomDelta: deltaTenacity,
    atomValue: tenacity,
  });

  if (!skillArmorcraft) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(tenacityValue)}</span>

          <FloatingText type={Delta.Tenacity} />
        </>
      }
      Icon={IconTenacity}
      isAnimated
      tooltip={MASTERIES[Mastery.Tenacity].name}
    />
  );
}
