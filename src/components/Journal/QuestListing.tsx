import { useRecoilValue } from "recoil";

import { QuestDisplay } from "@neverquest/components/Journal/QuestDisplay";
import { availableQuests, questStatus } from "@neverquest/state/journal";
import type { Quest, QuestClass, QuestProgression } from "@neverquest/types/unions";

export function QuestListing({ quest, questClass }: { quest: Quest; questClass: QuestClass }) {
  const availableQuestsValue = useRecoilValue(availableQuests(quest));
  const questStatusValue = useRecoilValue(questStatus(quest));

  return Object.values(availableQuestsValue).map((current) => {
    const status = questStatusValue[`${current.progressionMaximum}` as QuestProgression];

    if (status === undefined) {
      return null;
    }

    return (
      <QuestDisplay
        data={current}
        key={current.title}
        quest={quest}
        questClass={questClass}
        status={status}
      />
    );
  });
}
