import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecond } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  useDeltaText({
    delta: "damagePerSecond",
    format: "float",
    state: damagePerSecond,
  });

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      Icon={IconDamagePerSecond}
      iconProps={{ overlayPlacement: "bottom", size: "small" }}
      tooltip="Total damage per second"
    >
      <Stack direction="horizontal" gap={1}>
        <span>{formatNumber({ format: "float", value: damagePerSecondValue })}</span>

        <FloatingTextQueue delta="damagePerSecond" />
      </Stack>
    </IconDisplay>
  );
}
