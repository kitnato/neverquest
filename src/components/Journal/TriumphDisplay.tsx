import { Stack } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CompleteQuest } from "@neverquest/components/Journal/CompleteQuest";
import { TRIUMPHS } from "@neverquest/data/journal";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { Triumph } from "@neverquest/types/unions";

export function TriumphDisplay({ triumph }: { triumph: Triumph }) {
  const { description, title } = TRIUMPHS[triumph];

  return (
    <Stack direction="horizontal" gap={3}>
      <IconDisplay description={description} Icon={IconTriumph} tooltip="Triumph">
        {title}
      </IconDisplay>

      <div className="ms-auto">
        <CompleteQuest quest={triumph} />
      </div>
    </Stack>
  );
}
