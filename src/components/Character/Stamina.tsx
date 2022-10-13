import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "@neverquest/components/Character/Regeneration";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/lungs.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { currentStamina, isStaminaMaxedOut, maximumStamina } from "@neverquest/state/reserves";
import { totalStaminaRegenerationRate } from "@neverquest/state/statistics";
import { staminaChange } from "@neverquest/state/transactions";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { UIAttachment } from "@neverquest/types/ui";

export default function () {
  const showStaminaValue = useRecoilValue(isShowing(ShowingType.Stamina));

  if (!showStaminaValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter
              atom={currentStamina}
              atomMaximum={maximumStamina}
              attached={UIAttachment.Below}
            />

            <FloatingText atom={deltas(DeltaType.Stamina)} />
          </Stack>

          <Regeneration
            atomDeltaRegenerationRate={deltas(DeltaType.TotalStaminaRegenerationRate)}
            atomReserve={staminaChange}
            isReserveMaxedOut={isStaminaMaxedOut}
            regenerationRate={totalStaminaRegenerationRate}
          />
        </Stack>
      }
      Icon={Icon}
      isAnimated
      tooltip="Stamina"
    />
  );
}
