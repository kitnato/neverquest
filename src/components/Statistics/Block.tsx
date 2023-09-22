import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { block } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Block() {
  const blockValue = useRecoilValue(block);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("block"),
    type: "percentage",
    value: block,
  });

  if (isRanged(weaponValue) || (isMelee(weaponValue) && weaponValue.grip === "two-handed")) {
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
