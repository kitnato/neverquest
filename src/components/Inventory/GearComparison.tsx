import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import IconEquals from "@neverquest/icons/equals.svg?react";
import IconIncrease from "@neverquest/icons/increase.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { showGearComparison } from "@neverquest/state/settings";
import type { Showing } from "@neverquest/types/unions";

export function GearComparison({
  difference,
  isDownPositive = false,
  showing,
}: {
  difference: number;
  isDownPositive?: boolean;
  showing: Showing;
}) {
  const isShowingGearComparison = useRecoilValue(isShowing(showing));
  const showGearComparisonValue = useRecoilValue(showGearComparison);

  // NaN here is only produced by subtracting Infinity from Infinity, therefore it can be assumed as equal.
  const isDifferenceEqual = Number.isNaN(difference) || difference === 0;
  const isPositive = isDownPositive ? difference < 0 : difference > 0;

  if (isShowingGearComparison && showGearComparisonValue) {
    return (
      <span
        className={isDifferenceEqual ? "text-muted" : isPositive ? "text-success" : "text-danger"}
      >
        <IconImage
          Icon={isDifferenceEqual ? IconEquals : IconIncrease}
          isFlipped={difference < 0}
          size="small"
        />
      </span>
    );
  }

  return null;
}
