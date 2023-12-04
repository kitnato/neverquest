import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter";
import IconLooting from "@neverquest/icons/looting.svg?react";
import { isLooting } from "@neverquest/state/character";
import { isLootAvailable } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);

  if (isLootingValue) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconLooting}
        tooltip="Looting"
      >
        <LootingMeter />
      </IconDisplay>
    );
  }

  if (isLootAvailableValue) {
    return <hr />;
  }
}
