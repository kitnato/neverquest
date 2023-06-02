import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconTenacity } from "@neverquest/icons/tenacity.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { tenacity } from "@neverquest/state/statistics";
import { Delta, Showing, Skill } from "@neverquest/types/enums";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Tenacity() {
  const isShowingTenacity = useRecoilValue(isShowing(Showing.Tenacity));
  const tenacityValue = useRecoilValue(tenacity);
  const skillTenacity = useRecoilValue(skills(Skill.Armorcraft));

  useDeltaText({
    atomDelta: deltas(Delta.Tenacity),
    atomValue: tenacity,
  });

  if (!isShowingTenacity) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{skillTenacity ? formatPercentage(tenacityValue) : LABEL_EMPTY}</span>

          <FloatingText type={Delta.Tenacity} />
        </>
      }
      Icon={IconTenacity}
      isAnimated
      tooltip="Chance to skip recovery"
    />
  );
}
