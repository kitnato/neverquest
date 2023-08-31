import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { BLIGHT } from "@neverquest/data/combat";
import { blight, stamina, staminaMaximum, staminaMaximumTotal } from "@neverquest/state/reserves";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function StaminaMeter() {
  const blightValue = useRecoilValue(blight);
  const staminaValue = useRecoilValue(stamina);
  const staminaMaximumValue = useRecoilValue(staminaMaximum);
  const staminaMaximumTotalValue = useRecoilValue(staminaMaximumTotal);
  const resetStamina = useResetRecoilState(stamina);

  const penalty = staminaMaximumValue - staminaMaximumTotalValue;

  // Needed to catch attribute resets and poison/blight penalties.
  useEffect(() => {
    if (staminaValue > staminaMaximumTotalValue) {
      resetStamina();
    }
  }, [resetStamina, staminaMaximumTotalValue, staminaValue]);

  return (
    <LabelledProgressBar
      attached="below"
      label={`${staminaValue}/${staminaMaximumTotalValue}${
        penalty > 0
          ? ` (${staminaMaximumValue}) Blight: ${formatPercentage(blightValue * BLIGHT.increment)}`
          : ""
      }`}
      sibling={
        penalty > 0 ? (
          <ProgressBar animated key={2} now={penalty} striped variant="secondary" />
        ) : null
      }
      value={(staminaValue / staminaMaximumTotalValue) * 100}
      variant="dark"
    />
  );
}
