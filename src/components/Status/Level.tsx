import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { ownedItem } from "@neverquest/state/items";

export function Level() {
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));
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
      description={
        hasTomeOfPower && (
          <>
            <IconImage Icon={IconPower} size="tiny" />
            &nbsp;Empowered attribute effects.
          </>
        )
      }
      Icon={IconLevel}
      tooltip="Power level"
    />
  );
}
