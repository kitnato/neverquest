import { useRecoilValue } from "recoil";

import { QuestDisplay } from "@neverquest/components/Quests/QuestDisplay";
import { activeQuests } from "@neverquest/state/quests";
import type { Quest, QuestClass } from "@neverquest/types/unions";

export function QuestListing({ quest, questClass }: { quest: Quest; questClass: QuestClass }) {
  const activeQuestsValue = useRecoilValue(activeQuests(quest));

  return activeQuestsValue.map((current) => (
    <QuestDisplay activeQuest={current} key={current.title} quest={quest} questClass={questClass} />
  ));
}
