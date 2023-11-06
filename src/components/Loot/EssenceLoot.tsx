import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { essenceLoot } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function EssenceLoot() {
  const essenceLootValue = useRecoilValue(essenceLoot);

  useDeltaText({
    delta: "essenceLoot",
    state: essenceLoot,
  });

  if (essenceLootValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ name: "flipInX" })} direction="horizontal" gap={1}>
      <IconDisplay Icon={IconEssence} tooltip="Looted essence">
        {formatNumber({ value: essenceLootValue })}
      </IconDisplay>

      <DeltasDisplay delta="essenceLoot" />
    </Stack>
  );
}
