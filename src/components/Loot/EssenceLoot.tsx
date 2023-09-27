import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { deltas } from "@neverquest/state/deltas";
import { essenceLoot } from "@neverquest/state/resources";
import { formatValue } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function EssenceLoot() {
  const essenceLootValue = useRecoilValue(essenceLoot);

  useDeltaText({
    delta: deltas("essenceLoot"),
    value: essenceLoot,
  });

  if (essenceLootValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ type: "flipInX" })} direction="horizontal">
      <IconDisplay
        contents={formatValue({ value: essenceLootValue })}
        Icon={IconEssence}
        tooltip="Looted essence"
      />

      <FloatingText deltaType="essenceLoot" />
    </Stack>
  );
}
