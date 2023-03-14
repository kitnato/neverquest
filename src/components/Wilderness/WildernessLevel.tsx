import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconWildernessLevel } from "@neverquest/icons/flying-flag.svg";
import { deltas } from "@neverquest/state/deltas";
import { level } from "@neverquest/state/encounter";
import { DeltaType } from "@neverquest/types/enums";

export function WildernessLevel() {
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

          <FloatingText type={DeltaType.WildernessLevel} />
        </>
      }
      Icon={IconWildernessLevel}
      iconProps={{ overlayPlacement: "bottom" }}
      tooltip="Level"
    />
  );
}
