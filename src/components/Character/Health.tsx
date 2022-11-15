import Stack from "react-bootstrap/Stack";

import Regeneration from "@neverquest/components/Character/Regeneration";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import useChangeHealth from "@neverquest/hooks/actions/useChangeHealth";
import { ReactComponent as Icon } from "@neverquest/icons/hospital-cross.svg";
import { deltas } from "@neverquest/state/deltas";
import { currentHealth, isHealthMaxedOut, maximumHealth } from "@neverquest/state/reserves";
import { totalHealthRegenerationRate } from "@neverquest/state/statistics";
import { DeltaType } from "@neverquest/types/enums";
import { UIAttachment } from "@neverquest/types/ui";

export default function () {
  const changeHealth = useChangeHealth();

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter
              atom={currentHealth}
              atomMaximum={maximumHealth}
              attached={UIAttachment.Below}
            />

            <FloatingText atom={deltas(DeltaType.Health)} />
          </Stack>

          <Regeneration
            atomDeltaRegenerationRate={deltas(DeltaType.TotalHealthRegenerationRate)}
            handleChangeReserve={changeHealth}
            isReserveMaxedOut={isHealthMaxedOut}
            regenerationRate={totalHealthRegenerationRate}
          />
        </Stack>
      }
      Icon={Icon}
      tooltip="Health"
    />
  );
}
