import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { Delta } from "@neverquest/types/enums";

export function Level() {
  const levelValue = useRecoilValue(level);

  useDeltaText({
    atomDelta: deltas(Delta.Level),
    atomValue: level,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{levelValue}</span>

          <FloatingText type={Delta.Level} />
        </>
      }
      Icon={IconLevel}
      tooltip="Level"
    />
  );
}
