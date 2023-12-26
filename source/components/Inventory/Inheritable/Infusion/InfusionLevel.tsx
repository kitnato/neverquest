import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevelDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { infusionLevel } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function InfusionLevel({ infusable }: { infusable: Infusable }) {
  const infusionLevelState = infusionLevel(infusable);
  const infusionLevelValue = useRecoilValue(infusionLevelState);

  useDeltaText({
    delta: "infusionLevel",
    state: infusionLevelState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <InfusionLevelDisplay level={infusionLevelValue} overlayPlacement="top" />

      <DeltasDisplay delta="infusionLevel" />
    </Stack>
  );
}