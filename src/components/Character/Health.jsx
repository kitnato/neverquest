import Stack from "react-bootstrap/Stack";

import Regen from "components/Character/Regen";
import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/hospital-cross.svg";
import {
  currentHealth,
  deltaHealth,
  isHealthMaxedOut,
  maxHealth,
} from "state/resources";
import { totalHealthRegenRate } from "state/stats";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
          resourceMax={maxHealth}
        />

        <Regen
          isResourceMaxedOut={isHealthMaxedOut}
          regenRate={totalHealthRegenRate}
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
          resourceMax={maxHealth}
          type="health"
        />
      </Stack>
    </Stack>
  );
}
