import { Stack } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter";
import { MonsterRegeneration } from "@neverquest/components/Monster/MonsterRegeneration";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";

export function MonsterHealth() {
  return (
    <IconDisplay Icon={IconMonsterHealth} tooltip="Monster health">
      <Stack>
        <MonsterHealthMeter />

        <MonsterRegeneration />
      </Stack>
    </IconDisplay>
  );
}
