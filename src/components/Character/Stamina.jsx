import Stack from "react-bootstrap/Stack";

import Regeneration from "components/Character/Regeneration";
import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/lungs.svg";
import {
  currentStamina,
  deltaStamina,
  isStaminaMaxedOut,
  maximumStamina,
} from "state/resources";
import { totalStaminaRegenerationRate } from "state/stats";

export default function Stamina() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
          resourceMaximum={maximumStamina}
        />

        <Regeneration
          isResourceMaxedOut={isStaminaMaxedOut}
          regenerationRate={totalStaminaRegenerationRate}
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
          resourceMaximum={maximumStamina}
        />
      </Stack>
    </Stack>
  );
}
