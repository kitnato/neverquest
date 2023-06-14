import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { deltas } from "@neverquest/state/deltas";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecond } from "@neverquest/state/statistics";
import { formatFloat } from "@neverquest/utilities/formatters";

export function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  useDeltaText({
    atomDelta: deltas("damagePerSecond"),
    atomValue: damagePerSecond,
    type: "float",
  });

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatFloat(damagePerSecondValue)}</span>

          <FloatingText deltaType="damagePerSecond" />
        </Stack>
      }
      Icon={IconDamagePerSecond}
      iconProps={{ ignoreColor: true, overlayPlacement: "bottom", size: "tiny" }}
      tooltip="Total damage per second"
    />
  );
}
