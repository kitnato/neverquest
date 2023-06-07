import { Stack } from "react-bootstrap";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";

export function MonsterHealth() {
  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter type="monsterHealth" />

          <FloatingText deltaType="monsterHealth" isRelative />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Monster health"
    />
  );
}
