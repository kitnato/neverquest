import { Stack } from "react-bootstrap";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter";
import IconHealth from "@neverquest/icons/health.svg?react";

export function MonsterHealth() {
  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <MonsterHealthMeter />

          <FloatingTextQueue delta="monsterHealth" />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Monster health"
    />
  );
}
