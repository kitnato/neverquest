import { useEffect } from "react";
import {
  type RecoilState,
  type RecoilValueReadOnly,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import type { BootstrapTextVariant, DeltaDisplay } from "@neverquest/types/ui";
import type { DeltaText } from "@neverquest/types/unions";
import {
  formatFloat,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";

export function useDeltaText({
  atomDelta,
  atomValue,
  stop = ({ previous }) => previous === null,
  type = "integer",
}: {
  atomDelta: RecoilState<DeltaDisplay>;
  atomValue: RecoilValueReadOnly<number>;
  stop?: ({ current, previous }: { current: number; previous: number | null }) => boolean;
  type?: DeltaText;
}) {
  const currentValue = useRecoilValue(atomValue);
  const setDeltaValue = useSetRecoilState(atomDelta);

  const previousValue = usePreviousValue(currentValue);

  const isTime = type === "time";
  const negativeColor: BootstrapTextVariant = isTime ? "text-success" : "text-danger";
  const positiveColor: BootstrapTextVariant = isTime ? "text-danger" : "text-success";

  useEffect(() => {
    if (stop({ current: currentValue, previous: previousValue })) {
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
          : type === "percentage"
          ? formatPercentage(difference)
          : type === "float"
          ? formatFloat(difference)
          : difference
      }`,
    });
  }, [
    currentValue,
    isTime,
    negativeColor,
    positiveColor,
    previousValue,
    setDeltaValue,
    stop,
    type,
  ]);
}
