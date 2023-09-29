import { useEffect } from "react";
import {
  type RecoilState,
  type RecoilValueReadOnly,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import type { BootstrapTextVariant, DeltaDisplay } from "@neverquest/types/ui";
import type { NumberFormat } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function useDeltaText({
  delta,
  format = "integer",
  stop = ({ previous }) => previous === null,
  value,
}: {
  delta: RecoilState<DeltaDisplay>;
  format?: NumberFormat;
  stop?: ({ current, previous }: { current: number; previous: number | null }) => boolean;
  value: RecoilValueReadOnly<number>;
}) {
  const currentValue = useRecoilValue(value);
  const setDelta = useSetRecoilState(delta);

  const previousValue = usePreviousValue(currentValue);

  const isTime = format === "time";
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

    setDelta({
      color: isPositive ? positiveColor : negativeColor,
      value: `${isPositive ? "+" : isTime ? "-" : ""}${formatValue({
        format,
        value: isTime ? Math.abs(difference) : difference,
      })}`,
    });
  }, [currentValue, format, isTime, negativeColor, positiveColor, previousValue, setDelta, stop]);
}
