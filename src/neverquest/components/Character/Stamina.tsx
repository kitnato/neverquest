import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "neverquest/components/Character/Regeneration";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import { UIAttachment } from "neverquest/env.d";
import icon from "neverquest/icons/lungs.svg";
import { show } from "neverquest/state/global";
import {
  currentStamina,
  deltaStamina,
  isStaminaMaxedOut,
  maximumStamina,
} from "neverquest/state/resources";
import { totalStaminaRegenerationRate } from "neverquest/state/stats";

export default function Stamina() {
  const showValue = useRecoilValue(show);

  if (!showValue.stamina) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <ResourceMeter
          attached={UIAttachment.Below}
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
          resourceMaximum={maximumStamina}
        />

        <Regeneration
          isResourceMaxedOut={isStaminaMaxedOut}
          regenerationRate={totalStaminaRegenerationRate}
          resourceCurrent={currentStamina}
          resourceDelta={deltaStamina}
        />
      </Stack>
    </Stack>
  );
}
