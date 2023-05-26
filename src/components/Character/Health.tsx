import { Stack } from "react-bootstrap";

import { Regeneration } from "@neverquest/components/Character/Regeneration";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { DeltaType, ReserveType } from "@neverquest/types/enums";
import { UIAttachment } from "@neverquest/types/ui";

export function Health() {
  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter attached={UIAttachment.Below} type={ReserveType.Health} />

            <FloatingText type={DeltaType.Health} />
          </Stack>

          <Regeneration type={ReserveType.Health} />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Health"
    />
  );
}
