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
}: {
  delta: Delta;
  format?: NumberFormat;
  state: RecoilValueReadOnly<number>;
}) {
  const currentValue = useRecoilValue(state);

  const addDelta = useAddDelta();
  const previousValue = usePreviousValue(currentValue);

  const isTime = format === "time";

  useEffect(() => {
    if (previousValue === undefined) {
      return;
    }

    const difference = currentValue - previousValue;

    if (
      (format === "float" && Math.abs(difference) < 0.005) ||
      (format === "integer" && difference === 0) ||
      (format === "percentage" && Math.abs(difference) < 0.0005) ||
      (isTime && Math.abs(difference) < 10)
    ) {
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
  }, [addDelta, currentValue, delta, format, isTime, previousValue]);
}
