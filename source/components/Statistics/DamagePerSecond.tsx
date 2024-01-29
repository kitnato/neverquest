import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { damagePerSecond } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const ownedItemThaumaturgicGoggles = useRecoilValue(ownedItem("thaumaturgic goggles"));

  useDeltaText({
    delta: "damagePerSecond",
    format: "float",
    state: damagePerSecond,
  });

  if (ownedItemThaumaturgicGoggles !== undefined) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconDamagePerSecond}
        iconProps={{ className: "small", overlayPlacement: "bottom" }}
        tooltip="Total damage per second"
      >
        <Stack direction="horizontal" gap={1}>
          <span>{formatNumber({ format: "float", value: damagePerSecondValue })}</span>

          <DeltasDisplay delta="damagePerSecond" />
        </Stack>
      </IconDisplay>
    );
  }
}
