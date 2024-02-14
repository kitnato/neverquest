import { Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { LootDisplay } from "@neverquest/components/Loot/LootDisplay";
import { Looting } from "@neverquest/components/Loot/Looting";
import { useDropLoot } from "@neverquest/hooks/actions/useDropLoot";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { useProgressStage } from "@neverquest/hooks/actions/useProgressStage";
import { useTimer } from "@neverquest/hooks/useTimer";
import { isLooting, lootingDuration } from "@neverquest/state/character";

export function Loot() {
  const isLootingValue = useRecoilValue(isLooting);
  const setLootingDuration = useSetRecoilState(lootingDuration);

  const dropLoot = useDropLoot();
  const progression = useProgression();
  const progressStage = useProgressStage();

  useTimer({
    onElapsed: () => {
      dropLoot();
      progression();
      progressStage();
    },
    setTick: setLootingDuration,
    stop: !isLootingValue,
  });

  return (
    <Stack gap={3}>
      <Looting />

      <LootDisplay />
    </Stack>
  );
}
