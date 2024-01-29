import { useRecoilCallback } from "recoil";

import { QUESTS } from "@neverquest/data/quests";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { questStatuses } from "@neverquest/state/quests";
import type { Quest, QuestBonus } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteQuest() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ bonus, progression, quest }: { bonus: QuestBonus; progression: number; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        const progressionIndex = QUESTS[quest].progression.indexOf(progression);

        if (get(questStatuses(quest))[progressionIndex] === "achieved") {
          set(questStatuses(quest), (statuses) =>
            statuses.map((status, index) => (index === progressionIndex ? bonus : status)),
          );

          progressQuest({ quest: "completing" });
        }
      },
    [progressQuest],
  );
}
