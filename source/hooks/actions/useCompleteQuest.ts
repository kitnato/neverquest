import { useRecoilCallback } from "recoil";

import { QUESTS } from "@neverquest/data/quests";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { isShowing } from "@neverquest/state/isShowing";
import { questStatuses } from "@neverquest/state/quests";
import type { Quest, QuestBonus } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteQuest() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ bonus, progress, quest }: { bonus: QuestBonus; progress: number; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        const progressionIndex = QUESTS[quest].progression.indexOf(progress);

        if (get(questStatuses(quest))[progressionIndex] === "achieved") {
          set(questStatuses(quest), (statuses) =>
            statuses.map((status, index) => (index === progressionIndex ? bonus : status)),
          );
          set(isShowing("questBonus"), true);

          switch (bonus) {
            case "damageBonus": {
              set(isShowing("damageDetails"), true);
              break;
            }

            case "healthBonus": {
              set(isShowing("healthDetails"), true);
              break;
            }

            case "staminaBonus": {
              set(isShowing("staminaDetails"), true);
              break;
            }
          }

          progressQuest({ quest: "completing" });
        }
      },
    [progressQuest],
  );
}
