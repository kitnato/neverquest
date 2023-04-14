import { useEffect } from "react";
import {
  type RecoilState,
  type RecoilValueReadOnly,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import { DeltaTextType } from "@neverquest/types/enums";
import { type DeltaDisplay, FloatingTextVariant } from "@neverquest/types/ui";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function useDeltaText({
  atomDelta,
  atomValue,
  stop = (previous) => previous === null,
  type = DeltaTextType.Number,
}: {
  atomDelta: RecoilState<DeltaDisplay>;
  atomValue: RecoilValueReadOnly<number>;
  stop?: (previous: null | number, current: number) => boolean;
  type?: DeltaTextType;
}) {
  const currentValue = useRecoilValue(atomValue);
  const setDeltaValue = useSetRecoilState(atomDelta);

  const previousValue = usePreviousValue(currentValue);

  const isPercentage = type === DeltaTextType.Percentage;
  const isTime = type === DeltaTextType.Time;
  const negativeColor = isTime ? FloatingTextVariant.Positive : FloatingTextVariant.Negative;
  const positiveColor = isTime ? FloatingTextVariant.Negative : FloatingTextVariant.Positive;

  useEffect(() => {
    if (stop(previousValue, currentValue)) {
      return;
    }

    const difference = currentValue - (previousValue ?? 0);

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaValue({
      color: isPositive ? positiveColor : negativeColor,
      value: `${isPositive ? "+" : isTime ? "-" : ""}${
        isTime
          ? formatMilliseconds(Math.abs(difference))
          : isPercentage
          ? formatPercentage(difference)
          : difference
      }`,
    });
  }, [
    currentValue,
    isPercentage,
    isTime,
    negativeColor,
    positiveColor,
    previousValue,
    setDeltaValue,
    stop,
  ]);
}
