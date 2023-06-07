import { Stack } from "react-bootstrap";

import { Regeneration } from "@neverquest/components/Character/Regeneration";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";

export function Health() {
  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter attached="below" type="health" />

            <FloatingText deltaType="health" />
          </Stack>

          <Regeneration type="health" />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Health"
    />
  );
}
