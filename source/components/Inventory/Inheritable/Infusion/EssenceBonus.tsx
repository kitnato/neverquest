import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react";
import { infusionEffect } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function EssenceBonus() {
  const infusionEffectMonkeyPaw = infusionEffect("monkey paw");

  const infusionEffectValue = useRecoilValue(infusionEffectMonkeyPaw);

  useDeltaText({
    delta: "essenceBonus",
    format: "percentage",
    state: infusionEffectMonkeyPaw,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconEssenceBonus} tooltip="Essence loot bonus">
        +
        {formatNumber({
          format: "percentage",
          value: infusionEffectValue,
        })}
      </IconDisplay>

      <DeltasDisplay delta="essenceBonus" />
    </Stack>
  );
}
