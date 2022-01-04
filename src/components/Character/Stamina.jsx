import Stack from "react-bootstrap/Stack";

import Regen from "components/Character/Regen";
import ImageIcon from "components/ImageIcon";
import ResourceMeter from "components/ResourceMeter";
import icon from "icons/lungs.svg";
import {
  currentStamina,
  deltaStamina,
  isStaminaMaxedOut,
  maxStamina,
} from "state/resources";
import { totalStaminaRegenRate } from "state/stats";

export default function Stamina() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <ResourceMeter
          attached="below"
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
          resourceMax={maxStamina}
        />

        <Regen
          isResourceMaxedOut={isStaminaMaxedOut}
          regenRate={totalStaminaRegenRate}
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
          resourceMax={maxStamina}
        />
      </Stack>
    </Stack>
  );
}
