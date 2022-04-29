import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import LootingMeter from "neverquest/components/Loot/LootingMeter";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/vulture.svg";
import { isLooting } from "neverquest/state/character";
import { progress } from "neverquest/state/global";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const progressValue = useRecoilValue(progress);

  if (!isLootingValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Looting" />

      <LootingMeter />
    </Stack>
  );
}
