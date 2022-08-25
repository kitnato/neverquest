import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import LootingMeter from "@neverquest/components/Resource/LootingMeter";
import { ReactComponent as Icon } from "@neverquest/icons/vulture.svg";
import { isLooting } from "@neverquest/state/character";
import { progress } from "@neverquest/state/encounter";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const isLootingValue = useRecoilValue(isLooting);
  const progressValue = useRecoilValue(progress);

  if (!isLootingValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Looting" />

      <LootingMeter />
    </Stack>
  );
}
