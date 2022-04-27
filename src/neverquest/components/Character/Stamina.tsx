import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "neverquest/components/Character/Regeneration";
import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import { UIAnimationType, UIAttachment } from "neverquest/env";
import icon from "neverquest/icons/lungs.svg";
import { deltaStamina, deltaTotalStaminaRegenerationRate } from "neverquest/state/deltas";
import { currentStamina, isStaminaMaxedOut, maximumStamina } from "neverquest/state/resources";
import { showStamina } from "neverquest/state/show";
import { totalStaminaRegenerationRate } from "neverquest/state/statistics";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Stamina() {
  const showStaminaValue = useRecoilValue(showStamina);

  if (!showStaminaValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <Stack className="w-100" direction="horizontal">
          <ResourceMeter
            attached={UIAttachment.Below}
            atom={currentStamina}
            atomMaximum={maximumStamina}
          />

          <FloatingText atom={deltaStamina} />
        </Stack>

        <Regeneration
          atomResource={currentStamina}
          atomResourceDelta={deltaStamina}
          atomDeltaRegenerationRate={deltaTotalStaminaRegenerationRate}
          isResourceMaxedOut={isStaminaMaxedOut}
          regenerationRate={totalStaminaRegenerationRate}
        />
      </Stack>
    </Stack>
  );
}
