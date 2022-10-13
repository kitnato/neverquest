import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/shield-reflect.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";

export default function () {
  const { block } = useRecoilValue(shield);
  const showBlockChanceValue = useRecoilValue(isShowing(ShowingType.BlockChance));

  if (!showBlockChanceValue) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={formatPercentage(block)}
      Icon={Icon}
      tooltip="Block chance"
    />
  );
}
