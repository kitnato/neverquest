import Stack from "react-bootstrap/Stack";

import Regeneration from "neverquest/components/Character/Regeneration";
import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import ReserveMeter from "neverquest/components/ReserveMeter";
import icon from "neverquest/icons/hospital-cross.svg";
import { deltaHealth, deltaTotalHealthRegenerationRate } from "neverquest/state/deltas";
import {
  currentHealth,
  healthChange,
  isHealthMaxedOut,
  maximumHealth,
} from "neverquest/state/reserves";
import { totalHealthRegenerationRate } from "neverquest/state/statistics";
import { UIAttachment } from "neverquest/types/ui";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <Stack direction="horizontal" className="w-100">
          <ReserveMeter
            attached={UIAttachment.Below}
            atom={currentHealth}
            atomMaximum={maximumHealth}
          />

          <FloatingText atom={deltaHealth} />
        </Stack>

        <Regeneration
          atomReserve={healthChange}
          atomDeltaRegenerationRate={deltaTotalHealthRegenerationRate}
          isReserveMaxedOut={isHealthMaxedOut}
          regenerationRate={totalHealthRegenerationRate}
        />
      </Stack>
    </Stack>
  );
}
