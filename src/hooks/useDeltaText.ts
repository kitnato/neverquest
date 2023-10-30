import { useEffect } from "react";
import {
  type RecoilValueReadOnly,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import { deltas } from "@neverquest/state/deltas";
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
  stop?: ({ current, previous }: { current: number; previous: number | null }) => boolean;
}) {
  const deltaState = deltas(delta);

  const currentValue = useRecoilValue(state);
  const setDelta = useSetRecoilState(deltaState);
  const resetDelta = useResetRecoilState(deltaState);

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

    return resetDelta;
  }, [currentValue, format, isTime, previousValue, resetDelta, setDelta, stop]);
}
