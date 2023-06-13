import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { BLIGHT } from "@neverquest/data/monster";
import { blight, stamina, staminaMaximum, staminaMaximumTotal } from "@neverquest/state/reserves";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function StaminaMeter() {
  const blightValue = useRecoilValue(blight);
  const staminaValue = useRecoilValue(stamina);
  const staminaMaximumValue = useRecoilValue(staminaMaximum);
  const staminaMaximumTotalValue = useRecoilValue(staminaMaximumTotal);

  const penalty = staminaMaximumValue - staminaMaximumTotalValue;

  return (
    <LabelledProgressBar
      attached="below"
      label={`${staminaValue}/${staminaMaximumTotalValue}${
        penalty > 0 ? ` (${staminaMaximumValue})` : ""
      }`}
      sibling={
        penalty > 0 ? (
          <OverlayTrigger
            overlay={
              <Tooltip>{`Blight: ${formatPercentage(blightValue * BLIGHT.increment)}`}</Tooltip>
            }
            placement="top"
          >
            <ProgressBar key={2} now={penalty} striped variant="dark" />
          </OverlayTrigger>
        ) : null
      }
      value={(staminaValue / staminaMaximumTotalValue) * 100}
      variant="dark"
    />
  );
}
