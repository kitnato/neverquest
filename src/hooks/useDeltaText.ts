import { useEffect } from "react";
import { RecoilState, RecoilValueReadOnly, useRecoilValue, useSetRecoilState } from "recoil";

import usePreviousValue from "@neverquest/hooks/usePreviousValue";
import { DeltaDisplay, FloatingText } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function ({
  atomDelta,
  atomValue,
  isTime = false,
  stop = (previous) => previous === null,
}: {
  atomDelta: RecoilState<DeltaDisplay>;
  atomValue: RecoilValueReadOnly<number>;
  isTime?: boolean;
  stop?: (previous: null | number, current: number) => boolean;
}) {
  const currentValue = useRecoilValue(atomValue);
  const setDeltaValue = useSetRecoilState(atomDelta);

  const previousValue = usePreviousValue(currentValue);

  const negativeColor = isTime ? FloatingText.Positive : FloatingText.Negative;
  const positiveColor = isTime ? FloatingText.Negative : FloatingText.Positive;

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
  }, [currentValue, isTime, negativeColor, positiveColor, previousValue, setDeltaValue, stop]);
}
