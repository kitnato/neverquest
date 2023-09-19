import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { block } from "@neverquest/state/statistics";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Block() {
  const isShowingBlock = useRecoilValue(isShowing("block"));
  const blockValue = useRecoilValue(block);

  useDeltaText({
    delta: deltas("block"),
    type: "percentage",
    value: block,
  });

  if (!isShowingBlock) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatPercentage(blockValue)}</span>

          <FloatingText deltaType="block" />
        </Stack>
      }
      Icon={IconBlock}
      isAnimated
      tooltip="Block chance"
    />
  );
}
