import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter";
import IconLooting from "@neverquest/icons/looting.svg?react";
import { isLooting } from "@neverquest/state/character";
import { isLootAvailable } from "@neverquest/state/resources";

export function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);

  if (!isLootingValue) {
    if (!isLootAvailableValue) {
      return null;
    }

    return <hr />;
  }

  return (
    <IconDisplay Icon={IconLooting} isAnimated tooltip="Looting">
      <LootingMeter />
    </IconDisplay>
  );
}
