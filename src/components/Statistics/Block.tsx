import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { block } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

export function Block() {
  const blockValue = useRecoilValue(block);
  const isShowingBlock = useRecoilValue(isShowing("block"));
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    !isShowingBlock ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && !isTraitAcquiredColossus && weaponValue.grip === "two-handed");

  useDeltaText({
    delta: "block",
    format: "percentage",
    stop: () => isEmpty,
    value: block,
  });

  if (isEmpty) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ format: "percentage", value: blockValue })}</span>

          <FloatingTextQueue delta="block" />
        </Stack>
      }
      Icon={IconBlock}
      isAnimated
      tooltip="Block chance"
    />
  );
}
