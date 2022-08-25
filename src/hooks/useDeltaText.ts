import { useEffect } from "react";
import { RecoilState, RecoilValueReadOnly, useRecoilValue, useSetRecoilState } from "recoil";

import usePreviousValue from "@neverquest/hooks/usePreviousValue";
import { DeltaDisplay, FloatingTextType } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function ({
  deltaAtom,
  isTime = false,
  stop = (previous) => previous === null,
  valueAtom,
}: {
  deltaAtom: RecoilState<DeltaDisplay>;
  isTime?: boolean;
  stop?: (previous: null | number, current: number) => boolean;
  valueAtom: RecoilValueReadOnly<number>;
}) {
  const currentValue = useRecoilValue(valueAtom);
  const setDeltaValue = useSetRecoilState(deltaAtom);

  const previousValue = usePreviousValue(currentValue);

  const negativeColor = isTime ? FloatingTextType.Positive : FloatingTextType.Negative;
  const positiveColor = isTime ? FloatingTextType.Negative : FloatingTextType.Positive;

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
        isTime ? formatMilliseconds(Math.abs(difference)) : difference
      }`,
    });
  }, [currentValue, previousValue]);
}
