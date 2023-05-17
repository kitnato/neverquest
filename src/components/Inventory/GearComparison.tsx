import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconEquals } from "@neverquest/icons/equals.svg";
import { ReactComponent as IconIncrease } from "@neverquest/icons/increase.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { showGearComparison } from "@neverquest/state/settings";
import type { ShowingType } from "@neverquest/types/enums";

export function GearComparison({
  difference,
  isDownPositive = false,
  showingType,
}: {
  difference: number;
  isDownPositive?: boolean;
  showingType: ShowingType;
}) {
  const isShowingGearComparison = useRecoilValue(isShowing(showingType));
  const showGearComparisonValue = useRecoilValue(showGearComparison);

  // NaN here is only produced by subtracting Infinity from Infinity, therefore it can be assumed as equal.
  const isDifferenceEqual = Number.isNaN(difference) || difference === 0;
  const isPositive = isDownPositive ? difference < 0 : difference > 0;

  if (isShowingGearComparison && showGearComparisonValue) {
    return (
      <>
        &nbsp;
        <span
          className={
            isDifferenceEqual ? undefined : `color-${isPositive ? "positive" : "negative"}`
          }
        >
          <IconImage
            Icon={isDifferenceEqual ? IconEquals : IconIncrease}
            isFlipped={difference < 0}
            isSmall
          />
        </span>
      </>
    );
  }

  return null;
}
