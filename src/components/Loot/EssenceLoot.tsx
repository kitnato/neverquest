import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { essenceLoot } from "@neverquest/state/resources";
import { formatValue } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function EssenceLoot() {
  const essenceLootValue = useRecoilValue(essenceLoot);

  useDeltaText({
    delta: "essenceLoot",
    value: essenceLoot,
  });

  if (essenceLootValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ name: "flipInX" })} direction="horizontal">
      <IconDisplay
        contents={formatValue({ value: essenceLootValue })}
        Icon={IconEssence}
        tooltip="Looted essence"
      />

      <FloatingTextQueue delta="essenceLoot" />
    </Stack>
  );
}
