import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Loot/LootingMeter";
import { ReactComponent as IconLooting } from "@neverquest/icons/looting.svg";
import { isLooting } from "@neverquest/state/character";
import { progress } from "@neverquest/state/encounter";

export function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const progressValue = useRecoilValue(progress);

  if (!isLootingValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return (
    <IconDisplay contents={<LootingMeter />} Icon={IconLooting} isAnimated tooltip="Looting" />
  );
}
