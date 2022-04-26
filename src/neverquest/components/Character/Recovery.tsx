import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import RecoveryMeter from "neverquest/components/Character/RecoveryMeter";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import icon from "neverquest/icons/knockout.svg";
import { deltaTotalRecoveryRate } from "neverquest/state/deltas";
import { showRecovery } from "neverquest/state/show";
import { totalRecoveryRate } from "neverquest/state/stats";
import { UIFloatingTextType } from "neverquest/env";
import { formatMilliseconds } from "neverquest/utilities/helpers";
import { useEffect } from "react";

export default function Recovery() {
  const showRecoveryValue = useRecoilValue(showRecovery);
  const setDeltaTotalRecoveryRate = useSetRecoilState(deltaTotalRecoveryRate);
  const totalRecoveryRateValue = useRecoilValue(totalRecoveryRate);

  const previousTotalRecoveryRate = usePreviousValue(totalRecoveryRateValue);

  useEffect(() => {
    if (previousTotalRecoveryRate === null) {
      return;
    }

    const difference = totalRecoveryRateValue - previousTotalRecoveryRate;

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaTotalRecoveryRate({
      color: isPositive ? UIFloatingTextType.Negative : UIFloatingTextType.Positive,
      value: `${isPositive ? "+" : "-"}${formatMilliseconds(Math.abs(difference))}`,
    });
  }, [previousTotalRecoveryRate, totalRecoveryRateValue]);

  if (!showRecoveryValue) {
    return null;
  }

  return (
    <Stack className="animate__animated animate__flipInX" direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />

      <FloatingText atom={deltaTotalRecoveryRate} />
    </Stack>
  );
}
