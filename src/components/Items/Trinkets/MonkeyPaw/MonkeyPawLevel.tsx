import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { InfusionLevel } from "@neverquest/components/Items/Trinkets/InfusionLevel";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { monkeyPawLevel } from "@neverquest/state/items";

export function MonkeyPawLevel() {
  const monkeyPawLevelValue = useRecoilValue(monkeyPawLevel);

  useDeltaText({
    delta: deltas("monkeyPawLevel"),
    value: monkeyPawLevel,
  });

  return (
    <Stack direction="horizontal">
      <InfusionLevel level={monkeyPawLevelValue} />

      <FloatingText delta="monkeyPawLevel" />
    </Stack>
  );
}
