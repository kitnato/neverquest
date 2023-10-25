import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CompleteQuest } from "@neverquest/components/Journal/CompleteQuest";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { TRIUMPHS } from "@neverquest/data/journal";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { Triumph } from "@neverquest/types/unions";

export function TriumphDisplay({ triumph }: { triumph: Triumph }) {
  const { description, title } = TRIUMPHS[triumph];

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay description={description} Icon={IconTriumph} tooltip="Triumph">
        {title}
      </IconDisplay>

      <CompleteQuest quest={triumph} />
    </div>
  );
}
