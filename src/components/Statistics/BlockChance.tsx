import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/slashed-shield.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { blockChance } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function BlockChance() {
  const isShowingBlockChance = useRecoilValue(isShowing(ShowingType.BlockChance));
  const blockChanceValue = useRecoilValue(blockChance);

  const deltaBlockChance = deltas(DeltaType.BlockChance);

  useDeltaText({
    atomDelta: deltaBlockChance,
    atomValue: blockChance,
  });

  if (!isShowingBlockChance) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(blockChanceValue)}</span>

          <FloatingText type={DeltaType.BlockChance} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip="Block chance"
    />
  );
}
