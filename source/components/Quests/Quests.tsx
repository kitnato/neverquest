import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { QuestListing } from "@neverquest/components/Quests/QuestListing";
import { QUESTS_COUNT, QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { completedQuestsCount } from "@neverquest/state/quests";
import type { QuestClass } from "@neverquest/types/unions";

export function Quests({ questClass }: { questClass: QuestClass }) {
  const completedQuestsCountState = completedQuestsCount(questClass);

  const completedQuestsValue = useRecoilValue(completedQuestsCountState);

  const questCount = QUESTS_COUNT[questClass];

  useDeltaText({
    delta: questClass,
    state: completedQuestsCountState,
  });

  return (
    <Stack className="overflow-y-hidden" gap={3}>
      <hr />

      <LabelledProgressBar value={(completedQuestsValue / questCount) * 100} variant="dark">
        <Stack direction="horizontal" gap={1}>
          {`${completedQuestsValue}/${questCount}`}

          <DeltasDisplay delta={questClass} />
        </Stack>
      </LabelledProgressBar>

      <Stack className="overflow-y-auto" gap={3}>
        {QUEST_TYPES_BY_CLASS[questClass].map((quest) => (
          <QuestListing key={quest} quest={quest} questClass={questClass} />
        ))}
      </Stack>
    </Stack>
  );
}
