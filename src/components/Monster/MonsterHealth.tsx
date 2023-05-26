import { Stack } from "react-bootstrap";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { DeltaType, ReserveType } from "@neverquest/types/enums";

export function MonsterHealth() {
  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter type={ReserveType.MonsterHealth} />

          <FloatingText type={DeltaType.HealthMonster} />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Monster health"
    />
  );
}
