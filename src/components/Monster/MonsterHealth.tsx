import Stack from "react-bootstrap/Stack";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/hospital-cross.svg";
import { deltas } from "@neverquest/state/deltas";
import { currentHealthMonster, maximumHealthMonster } from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  return (
    <IconDisplay
      Icon={Icon}
      contents={
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter atom={currentHealthMonster} atomMaximum={maximumHealthMonster} />

          <FloatingText atom={deltas(DeltaType.HealthMonster)} />
        </Stack>
      }
      tooltip="Monster health"
    />
  );
}
