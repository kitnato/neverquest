import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "@neverquest/components/Character/Regeneration";
import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import icon from "@neverquest/icons/lungs.svg";
import { deltas } from "@neverquest/state/deltas";
import {
  currentStamina,
  isStaminaMaxedOut,
  maximumStamina,
  staminaChange,
} from "@neverquest/state/reserves";
import { isShowing } from "@neverquest/state/isShowing";
import { totalStaminaRegenerationRate } from "@neverquest/state/statistics";
import { AnimationType, UIAttachment } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

export default function Stamina() {
  const showStaminaValue = useRecoilValue(isShowing(ShowingType.Stamina));

  if (!showStaminaValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter
            attached={UIAttachment.Below}
            atom={currentStamina}
            atomMaximum={maximumStamina}
          />

          <FloatingText atom={deltas(DeltaType.Stamina)} />
        </Stack>

        <Regeneration
          atomReserve={staminaChange}
          atomDeltaRegenerationRate={deltas(DeltaType.TotalStaminaRegenerationRate)}
          isReserveMaxedOut={isStaminaMaxedOut}
          regenerationRate={totalStaminaRegenerationRate}
        />
      </Stack>
    </Stack>
  );
}
