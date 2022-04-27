import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import LootingMeter from "neverquest/components/Monster/LootingMeter";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/vulture.svg";
import { isLooting } from "neverquest/state/character";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Looting() {
  const isLootingValue = useRecoilValue(isLooting);

  if (!isLootingValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Looting" />

      <LootingMeter />
    </Stack>
  );
}
