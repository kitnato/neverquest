import { Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { LootDisplay } from "@neverquest/components/Loot/LootDisplay";
import { Looting } from "@neverquest/components/Loot/Looting";
import { useProgressStage } from "@neverquest/hooks/actions/useProgressStage";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isLooting, lootingDuration } from "@neverquest/state/character";

export function Loot() {
  const isLootingValue = useRecoilValue(isLooting);
  const setLootingDuration = useSetRecoilState(lootingDuration);

  const progressStage = useProgressStage();

  useAnimate({
    delta: setLootingDuration,
    onDelta: progressStage,
    stop: !isLootingValue,
  });

  return (
    <Stack gap={3}>
      <Looting />

      <LootDisplay />
    </Stack>
  );
}
