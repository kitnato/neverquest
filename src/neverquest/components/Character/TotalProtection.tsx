import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import { UIFloatingTextType } from "neverquest/env";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import icon from "neverquest/icons/barbute.svg";
import { deltaProtection } from "neverquest/state/deltas";
import { showTotalProtection } from "neverquest/state/show";
import { totalProtection } from "neverquest/state/stats";

export default function TotalProtection() {
  const showTotalProtectionValue = useRecoilValue(showTotalProtection);
  const totalProtectionValue = useRecoilValue(totalProtection);
  const setDeltaProtection = useSetRecoilState(deltaProtection);

  const previousTotalProtection = usePreviousValue(totalProtectionValue);

  useEffect(() => {
    const difference = totalProtectionValue - previousTotalProtection;

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaProtection({
      color: isPositive ? UIFloatingTextType.Positive : UIFloatingTextType.Negative,
      value: `${isPositive ? "+" : ""}${difference}`,
    });
  }, [previousTotalProtection, totalProtectionValue]);

  if (!showTotalProtectionValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total protection" />

      <span>{totalProtectionValue}</span>

      <FloatingText atom={deltaProtection} />
    </Stack>
  );
}
