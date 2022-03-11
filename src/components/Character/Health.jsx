import Stack from "react-bootstrap/Stack";

import Regeneration from "components/Character/Regeneration";
import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/hospital-cross.svg";
import {
  currentHealth,
  deltaHealth,
  isHealthMaxedOut,
  maximumHealth,
} from "state/resources";
import { totalHealthRegenerationRate } from "state/stats";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
          resourceMaximum={maximumHealth}
        />

        <Regeneration
          isResourceMaxedOut={isHealthMaxedOut}
          regenerationRate={totalHealthRegenerationRate}
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
          resourceMaximum={maximumHealth}
          type="health"
        />
      </Stack>
    </Stack>
  );
}
