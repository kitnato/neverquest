import { useEffect } from "react";
import { type RecoilValueReadOnly, useRecoilValue, useSetRecoilState } from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import { deltas } from "@neverquest/state/deltas";
import type { Delta, NumberFormat } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function useDeltaText({
  delta,
  format = "integer",
  stop = () => false,
  value,
}: {
  delta: Delta;
  format?: NumberFormat;
  stop?: ({ current, previous }: { current: number; previous: number | null }) => boolean;
  value: RecoilValueReadOnly<number>;
}) {
  const currentValue = useRecoilValue(value);
  const setDelta = useSetRecoilState(deltas(delta));

  const previousValue = usePreviousValue(currentValue);

  const isTime = format === "time";

  useEffect(() => {
    if (previousValue === null || stop({ current: currentValue, previous: previousValue })) {
      return;
    }

    const difference = currentValue - (previousValue ?? 0);

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDelta({
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
    });
  }, [currentValue, delta, format, isTime, previousValue, setDelta, stop]);
}
