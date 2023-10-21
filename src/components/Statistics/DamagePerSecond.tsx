import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecond } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  useDeltaText({
    delta: "damagePerSecond",
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

          <FloatingTextQueue delta="damagePerSecond" />
        </Stack>
      }
      Icon={IconDamagePerSecond}
      iconProps={{ overlayPlacement: "bottom", size: "small" }}
      tooltip="Total damage per second"
    />
  );
}
