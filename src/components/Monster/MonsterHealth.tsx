import Stack from "react-bootstrap/Stack";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/hospital-cross.svg";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType, ReserveType } from "@neverquest/types/enums";

export default function () {
  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter type={ReserveType.MonsterHealth} />

          <FloatingText atom={deltas(DeltaType.HealthMonster)} />
        </Stack>
      }
      Icon={Icon}
      tooltip="Monster health"
    />
  );
}
