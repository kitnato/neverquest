import { useEffect } from "react";
import { Atom, useAtomValue, useSetAtom, WritableAtom } from "jotai";

import usePreviousValue from "neverquest/hooks/usePreviousValue";
import { DeltaDisplay, FloatingTextType } from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function useDeltaText({
  deltaAtom,
  isTime = false,
  valueAtom,
}: {
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
    if (previousValue === null) {
      return;
    }

    const difference = currentValue - previousValue;

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
