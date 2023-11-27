import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBlock from "@neverquest/icons/block.svg?react";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { blockChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Block() {
  const blockChanceValue = useRecoilValue(blockChance);
  const isShowingBlockChance = useRecoilValue(isShowing("blockChance"));
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    !isShowingBlockChance ||
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && !isTraitAcquiredColossus && weaponValue.grip === "two-handed");

  useDeltaText({
    delta: "blockChance",
    format: "percentage",
    state: blockChance,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay Icon={IconBlock} isAnimated tooltip="Total block chance">
        <Stack direction="horizontal" gap={1}>
          <span>{formatNumber({ format: "percentage", value: blockChanceValue })}</span>

          <DeltasDisplay delta="blockChance" />
        </Stack>
      </IconDisplay>
    );
  }
}
