import Stack from "react-bootstrap/Stack";

import Regeneration from "neverquest/components/Character/Regeneration";
import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import { UIAttachment } from "neverquest/env";
import icon from "neverquest/icons/hospital-cross.svg";
import { deltaHealth, deltaTotalHealthRegenerationRate } from "neverquest/state/deltas";
import { currentHealth, isHealthMaxedOut, maximumHealth } from "neverquest/state/resources";
import { totalHealthRegenerationRate } from "neverquest/state/stats";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <Stack direction="horizontal" className="w-100">
          <ResourceMeter
            attached={UIAttachment.Below}
            atom={currentHealth}
            atomMaximum={maximumHealth}
          />

          <FloatingText atom={deltaHealth} />
        </Stack>

        <Regeneration
          atomResource={currentHealth}
          atomResourceDelta={deltaHealth}
          atomDeltaRegenerationRate={deltaTotalHealthRegenerationRate}
          isResourceMaxedOut={isHealthMaxedOut}
          regenerationRate={totalHealthRegenerationRate}
        />
      </Stack>
    </Stack>
  );
}
