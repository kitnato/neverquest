import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { deltas } from "@neverquest/state/deltas";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecond } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  useDeltaText({
    delta: deltas("damagePerSecond"),
    format: "float",
    value: damagePerSecond,
  });

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ format: "float", value: damagePerSecondValue })}</span>

          <FloatingText delta="damagePerSecond" />
        </Stack>
      }
      Icon={IconDamagePerSecond}
      iconProps={{ overlayPlacement: "bottom", size: "small" }}
      tooltip="Total damage per second"
    />
  );
}
