import { useEffect } from "react";
import { type RecoilValueReadOnly, useRecoilValue } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import type { Delta, NumberFormat } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function useDeltaText({
  delta,
  format = "integer",
  state,
  stop = () => false,
}: {
  delta: Delta;
  format?: NumberFormat;
  state: RecoilValueReadOnly<number>;
  stop?: ({ current, previous }: { current: number; previous: number | undefined }) => boolean;
}) {
  const currentValue = useRecoilValue(state);

  const addDelta = useAddDelta();
  const previousValue = usePreviousValue(currentValue);

  const isTime = format === "time";

  useEffect(() => {
    if (previousValue === undefined || stop({ current: currentValue, previous: previousValue })) {
      return;
    }

    const difference = currentValue - previousValue;

    if (difference >= 0 && difference < 0.005) {
      return;
    }

    const isPositive = difference > 0;

    addDelta({
      contents: {
        color: isPositive
          ? isTime
            ? "text-danger"
            : "text-success"
          : isTime
            ? "text-success"
            : "text-danger",
        value: `${isPositive ? "+" : ""}${formatNumber({
          format,
          value: difference,
        })}`,
      },
      delta,
    });
  }, [addDelta, currentValue, delta, format, isTime, previousValue, stop]);
}
