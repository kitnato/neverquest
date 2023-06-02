import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { parry } from "@neverquest/state/statistics";
import { Delta, Showing, Skill } from "@neverquest/types/enums";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Parry() {
  const parryValue = useRecoilValue(parry);
  const isShowingParry = useRecoilValue(isShowing(Showing.Parry));
  const skillEscrime = useRecoilValue(skills(Skill.Escrime));

  useDeltaText({
    atomDelta: deltas(Delta.Parry),
    atomValue: parry,
  });

  if (!isShowingParry) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{skillEscrime ? formatPercentage(parryValue) : LABEL_EMPTY}</span>

          <FloatingText type={Delta.Parry} />
        </>
      }
      Icon={IconParry}
      isAnimated
      tooltip="Parry chance"
    />
  );
}
