import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/flying-flag.svg";
import { deltas } from "@neverquest/state/deltas";
import { level } from "@neverquest/state/encounter";
import { DeltaType } from "@neverquest/types/enums";
import { OverlayPlacement } from "@neverquest/types/ui";

export default function () {
  const levelValue = useRecoilValue(level);

  const deltaWildernessLevel = deltas(DeltaType.WildernessLevel);

  useDeltaText({
    atomDelta: deltaWildernessLevel,
    atomValue: level,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{levelValue}</span>

          <FloatingText atom={deltaWildernessLevel} />
        </>
      }
      Icon={Icon}
      iconProps={{ placement: OverlayPlacement.Bottom }}
      tooltip="Level"
    />
  );
}
