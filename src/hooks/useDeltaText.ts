import { Atom, useAtomValue, useSetAtom, WritableAtom } from "jotai";
import { useEffect } from "react";

import usePreviousValue from "@neverquest/hooks/usePreviousValue";
import { DeltaDisplay, FloatingTextType } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function useDeltaText({
  countInitial = false,
  deltaAtom,
  isTime = false,
  valueAtom,
}: {
  countInitial?: boolean;
  deltaAtom: WritableAtom<DeltaDisplay, DeltaDisplay>;
  isTime?: boolean;
  valueAtom: Atom<number>;
}) {
  const setDeltaValue = useSetAtom(deltaAtom);
  const currentValue = useAtomValue(valueAtom);

  const previousValue = usePreviousValue(currentValue);

  const negativeColor = isTime ? FloatingTextType.Positive : FloatingTextType.Negative;
  const positiveColor = isTime ? FloatingTextType.Negative : FloatingTextType.Positive;

  useEffect(() => {
    if (!countInitial && previousValue === null) {
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
        isTime ? formatMilliseconds(Math.abs(difference)) : difference
      }`,
    });
  }, [currentValue, previousValue]);
}
