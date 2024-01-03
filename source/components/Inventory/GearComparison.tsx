import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import IconEquals from "@neverquest/icons/equals.svg?react";
import IconIncrease from "@neverquest/icons/increase.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { showGearComparison } from "@neverquest/state/settings";
import type { Showing } from "@neverquest/types/unions";

export function GearComparison({
  difference,
  lowerIsPositive = false,
  showing,
}: {
  difference: number;
  lowerIsPositive?: boolean;
  showing: Showing;
}) {
  const isShowingGearComparison = useRecoilValue(isShowing(showing));
  const showGearComparisonValue = useRecoilValue(showGearComparison);

  // NaN here is produced by subtracting Infinity from Infinity.
  const isDifferenceEqual = Number.isNaN(difference) || difference === 0;
  const isPositive = lowerIsPositive ? difference < 0 : difference > 0;

  if (isShowingGearComparison && showGearComparisonValue) {
    return (
      <IconImage
        className={`small ${
          isDifferenceEqual ? "text-muted" : isPositive ? "text-success" : "text-danger"
        }`}
        Icon={isDifferenceEqual ? IconEquals : IconIncrease}
        isFlipped={difference < 0}
      />
    );
  }

  return;
}
