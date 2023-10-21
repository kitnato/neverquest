import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Usable/Infusion/InfusionLevelDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { infusionLevel } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function InfusionLevel({ infusable }: { infusable: Infusable }) {
  const infusionLevelState = infusionLevel(infusable);
  const infusionLevelValue = useRecoilValue(infusionLevelState);

  useDeltaText({
    delta: "infusionLevel",
    value: infusionLevelState,
  });

  return (
    <Stack direction="horizontal">
      <InfusionLevelDisplay level={infusionLevelValue} overlayPlacement="top" />

      <FloatingTextQueue delta="infusionLevel" />
    </Stack>
  );
}
