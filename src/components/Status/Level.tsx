import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";

export function Level() {
  const levelValue = useRecoilValue(level);

  useDeltaText({
    atomDelta: deltas("level"),
    atomValue: level,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{levelValue}</span>

          <FloatingText deltaType="level" />
        </Stack>
      }
      description={`Increases attribute effects by ${levelValue}%`}
      Icon={IconLevel}
      tooltip="Power level"
    />
  );
}
