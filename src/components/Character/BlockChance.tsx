import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/slashed-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const isShowingBlockChance = useRecoilValue(isShowing(ShowingType.BlockChance));
  const { blockChance } = useRecoilValue(shield);

  if (!isShowingBlockChance) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={formatPercentage(blockChance)}
      Icon={Icon}
      tooltip="Block chance"
    />
  );
}
