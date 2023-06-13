import { Stack } from "react-bootstrap";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { HealthMeter } from "@neverquest/components/Reserves/HealthMeter";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";

export function Health() {
  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <HealthMeter />

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
