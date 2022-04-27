import { useEffect } from "react";
import { RecoilState, RecoilValueReadOnly, useRecoilValue, useSetRecoilState } from "recoil";

import { DeltaDisplay, UIFloatingTextType } from "neverquest/env";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function useDeltaText({
  deltaAtom,
  isTime = false,
  valueAtom,
}: {
  deltaAtom: RecoilState<DeltaDisplay>;
  isTime?: boolean;
  valueAtom: RecoilValueReadOnly<number>;
}) {
  const setDeltaValue = useSetRecoilState(deltaAtom);
  const currentValue = useRecoilValue(valueAtom);

  const previousValue = usePreviousValue(currentValue);

  const negativeColor = isTime ? UIFloatingTextType.Positive : UIFloatingTextType.Negative;
  const positiveColor = isTime ? UIFloatingTextType.Negative : UIFloatingTextType.Positive;

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
  }, [previousValue, currentValue]);
}
