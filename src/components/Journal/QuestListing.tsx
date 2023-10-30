import { useRecoilValue } from "recoil";

import { QuestDisplay } from "@neverquest/components/Journal/QuestDisplay";
import { QUESTS } from "@neverquest/data/journal";
import { availableQuests, questStatus } from "@neverquest/state/journal";
import type { Quest, QuestClass, QuestProgression } from "@neverquest/types/unions";

export function QuestListing({ quest, questClass }: { quest: Quest; questClass: QuestClass }) {
  const availableQuestsValue = useRecoilValue(availableQuests(quest));
  const questStatusValue = useRecoilValue(questStatus(quest));

  return Object.keys(availableQuestsValue)
    .toSorted((current1, current2) => parseInt(current1) - parseInt(current2))
    .map((current) => {
      const index = current as QuestProgression;
      const data = QUESTS[quest][index];
      const status = questStatusValue[index];

      if (data === undefined || status === undefined) {
        return null;
      }

      return (
        <QuestDisplay
          data={data}
          key={data.title}
          quest={quest}
          questClass={questClass}
          status={status}
        />
      );
    });
}
