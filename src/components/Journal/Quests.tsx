import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { QuestListing } from "@neverquest/components/Journal/QuestListing";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { QUESTS_COUNT, QUEST_TYPES_BY_CLASS } from "@neverquest/data/journal";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { completedQuestCount } from "@neverquest/state/journal";
import type { QuestClass } from "@neverquest/types/unions";

export function Quests({ questClass }: { questClass: QuestClass }) {
  const completedQuestsState = completedQuestCount(questClass);

  const completedQuestsValue = useRecoilValue(completedQuestsState);

  const questCount = QUESTS_COUNT[questClass];

  useDeltaText({
    delta: questClass,
    state: completedQuestsState,
  });

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Completion</h6>

        <LabelledProgressBar value={(completedQuestsValue / questCount) * 100} variant="dark">
          <Stack direction="horizontal">
            {`${completedQuestsValue}/${questCount}`}

            <FloatingTextQueue delta={questClass} />
          </Stack>
        </LabelledProgressBar>
      </Stack>

      <Stack gap={3}>
        {QUEST_TYPES_BY_CLASS[questClass].map((current) => (
          <QuestListing key={current} quest={current} questClass={questClass} />
        ))}
      </Stack>
    </Stack>
  );
}
