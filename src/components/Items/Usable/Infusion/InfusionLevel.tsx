import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { InfusionLevelDisplay } from "@neverquest/components/Items/Usable/Infusion/InfusionLevelDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { infusionLevel } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function InfusionLevel({ infusable }: { infusable: Infusable }) {
  const infusionLevelState = infusionLevel(infusable);
  const infusionLevelValue = useRecoilValue(infusionLevelState);

  useDeltaText({
    delta: deltas("infusionLevel"),
    value: infusionLevelState,
  });

  return (
    <Stack direction="horizontal">
      <InfusionLevelDisplay level={infusionLevelValue} overlayPlacement="bottom" />

      <FloatingText delta="infusionLevel" />
    </Stack>
  );
}
