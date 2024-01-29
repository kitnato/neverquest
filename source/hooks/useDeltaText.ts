import { useEffect } from "react";
import { type RecoilValueReadOnly, useRecoilValue } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import type { DeltaDisplay } from "@neverquest/types/ui";
import type { Delta, NumberFormat } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function useDeltaText({
  delta,
  format = "integer",
  ignoreZero = false,
  state,
  suffix,
}: {
  delta: Delta;
  format?: NumberFormat;
  ignoreZero?: boolean;
  state: RecoilValueReadOnly<number>;
  suffix?: string;
}) {
  const currentValue = useRecoilValue(state);

  const addDelta = useAddDelta();
  const previousValue = usePreviousValue(currentValue);

  const isTime = format === "time";

  useEffect(() => {
    if (previousValue === undefined) {
      return;
    }

    if (ignoreZero && currentValue === 0) {
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
    const deltaContents: DeltaDisplay[] = [
      {
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
    ];

    if (suffix !== undefined) {
      deltaContents.push({
        color: "text-muted",
        value: suffix,
      });
    }

    addDelta({
      contents: deltaContents,
      delta,
    });
  }, [addDelta, currentValue, delta, format, ignoreZero, isTime, previousValue, suffix]);
}
