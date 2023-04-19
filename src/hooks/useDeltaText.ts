import { useEffect } from "react";
import {
  type RecoilState,
  type RecoilValueReadOnly,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import { DeltaText } from "@neverquest/types/enums";
import type { BootstrapTextVariant, DeltaDisplay } from "@neverquest/types/ui";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function useDeltaText({
  atomDelta,
  atomValue,
  stop = (previous) => previous === null,
  type = DeltaText.Number,
}: {
  atomDelta: RecoilState<DeltaDisplay>;
  atomValue: RecoilValueReadOnly<number>;
  stop?: (previous: null | number, current: number) => boolean;
  type?: DeltaText;
}) {
  const currentValue = useRecoilValue(atomValue);
  const setDeltaValue = useSetRecoilState(atomDelta);

  const previousValue = usePreviousValue(currentValue);

  const isPercentage = type === DeltaText.Percentage;
  const isTime = type === DeltaText.Time;
  const negativeColor: BootstrapTextVariant = isTime ? "text-success" : "text-danger";
  const positiveColor: BootstrapTextVariant = isTime ? "text-danger" : "text-success";

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
