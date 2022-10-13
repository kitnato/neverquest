import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import LootingMeter from "@neverquest/components/Resource/LootingMeter";
import { ReactComponent as Icon } from "@neverquest/icons/vulture.svg";
import { isLooting } from "@neverquest/state/character";
import { progress } from "@neverquest/state/encounter";

export default function () {
  const isLootingValue = useRecoilValue(isLooting);
  const progressValue = useRecoilValue(progress);

  if (!isLootingValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return <IconDisplay Icon={Icon} contents={<LootingMeter />} isAnimated tooltip="Looting" />;
}
