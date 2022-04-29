import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/shield-reflect.svg";
import { shield } from "neverquest/state/inventory";
import { showBlockChance } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { formatPercentage, getAnimationClass } from "neverquest/utilities/helpers";

export default function Block() {
  const { block } = useRecoilValue(shield);
  const showBlockChanceValue = useRecoilValue(showBlockChance);

  if (!showBlockChanceValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Block chance" />

      <span>{formatPercentage(block)}</span>
    </Stack>
  );
}
