import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/shield-reflect.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage, getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function Block() {
  const { block } = useRecoilValue(shield);
  const showBlockChanceValue = useRecoilValue(isShowing(ShowingType.BlockChance));

  if (!showBlockChanceValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Block chance" />

      <span>{formatPercentage(block)}</span>
    </Stack>
  );
}
