import Stack from "react-bootstrap/Stack";

import Regen from "components/Character/Regen";
import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/hospital-cross.svg";
import { currentHealth, isHealthMaxedOut, maxHealth } from "state/resources";
import { totalHealthRegenRate } from "state/stats";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentHealth}
          resourceMax={maxHealth}
        />

        <Regen
          isResourceMaxedOut={isHealthMaxedOut}
          regenRate={totalHealthRegenRate}
          resourceCurrent={currentHealth}
          resourceMax={maxHealth}
          type="health"
        />
      </Stack>
    </Stack>
  );
}
