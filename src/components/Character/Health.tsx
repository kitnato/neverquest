import Stack from "react-bootstrap/Stack";

import Regeneration from "@neverquest/components/Character/Regeneration";
import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/hospital-cross.svg";
import { deltas } from "@neverquest/state/deltas";
import { currentHealth, isHealthMaxedOut, maximumHealth } from "@neverquest/state/reserves";
import { totalHealthRegenerationRate } from "@neverquest/state/statistics";
import { healthChange } from "@neverquest/state/transactions";
import { UIAttachment } from "@neverquest/types/ui";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Health" />

      <Stack>
        <Stack direction="horizontal" className="w-100">
          <ReserveMeter
            attached={UIAttachment.Below}
            atom={currentHealth}
            atomMaximum={maximumHealth}
          />

          <FloatingText atom={deltas(DeltaType.Health)} />
        </Stack>

        <Regeneration
          atomReserve={healthChange}
          atomDeltaRegenerationRate={deltas(DeltaType.TotalHealthRegenerationRate)}
          isReserveMaxedOut={isHealthMaxedOut}
          regenerationRate={totalHealthRegenerationRate}
        />
      </Stack>
    </Stack>
  );
}
