import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { block } from "@neverquest/state/statistics";
import { Delta, DeltaText, Showing } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Block() {
  const isShowingBlock = useRecoilValue(isShowing(Showing.Block));
  const blockValue = useRecoilValue(block);

  const deltaBlock = deltas(Delta.Block);

  useDeltaText({
    atomDelta: deltaBlock,
    atomValue: block,
    type: DeltaText.Percentage,
  });

  if (!isShowingBlock) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(blockValue)}</span>

          <FloatingText type={Delta.Block} />
        </>
      }
      Icon={IconBlock}
      isAnimated
      tooltip="Block chance"
    />
  );
}
