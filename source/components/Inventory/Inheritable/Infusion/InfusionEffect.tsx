import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { INFUSABLES } from "@neverquest/data/items";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { infusionEffect } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function InfusionEffect({ infusable }: { infusable: Infusable }) {
  const infusionEffectState = infusionEffect(infusable);

  const infusionEffectValue = useRecoilValue(infusionEffectState);

  const { delta, EffectIcon, tooltip } = INFUSABLES[infusable];

  useDeltaText({
    delta,
    format: "percentage",
    state: infusionEffectState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={EffectIcon} tooltip={tooltip}>
        +
        {formatNumber({
          decimals: infusable === "mysterious egg" && infusionEffectValue >= 1 ? 0 : 2,
          format: "percentage",
          value: Math.abs(infusionEffectValue),
        })}
      </IconDisplay>

      <DeltasDisplay delta={delta} />
    </Stack>
  );
}
