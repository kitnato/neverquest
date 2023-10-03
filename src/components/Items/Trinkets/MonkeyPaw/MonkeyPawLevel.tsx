import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { InfusionLevel } from "@neverquest/components/Items/Trinkets/InfusionLevel";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { infusionLevel } from "@neverquest/state/items";

export function MonkeyPawLevel() {
  const infusionLevelState = infusionLevel("monkey paw");
  const infusionLevelValue = useRecoilValue(infusionLevelState);

  useDeltaText({
    delta: deltas("infusionLevel"),
    value: infusionLevelState,
  });

  return (
    <Stack direction="horizontal">
      <InfusionLevel level={infusionLevelValue} />

      <FloatingText delta="infusionLevel" />
    </Stack>
  );
}
