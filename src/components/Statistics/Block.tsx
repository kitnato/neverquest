import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { block } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

export function Block() {
  const blockValue = useRecoilValue(block);
  const isShowingBlock = useRecoilValue(isShowing("block"));
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("block"),
    format: "percentage",
    value: block,
  });

  if (
    !isShowingBlock ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip === "two-handed")
  ) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ format: "percentage", value: blockValue })}</span>

          <FloatingText delta="block" />
        </Stack>
      }
      Icon={IconBlock}
      isAnimated
      tooltip="Block chance"
    />
  );
}
