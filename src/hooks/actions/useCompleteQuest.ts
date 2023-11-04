import { useRecoilCallback } from "recoil";

import { QUESTS } from "@neverquest/data/quests";
import { isShowing } from "@neverquest/state/isShowing";
import { questStatus } from "@neverquest/state/quests";
import type { Quest, QuestBonus } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteQuest() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ bonus, progress, quest }: { bonus: QuestBonus; progress: number; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        const progressionIndex = QUESTS[quest].progression.indexOf(progress);

        if (get(questStatus(quest))[progressionIndex] === true) {
          set(questStatus(quest), (current) =>
            current.map((currentStatus, index) =>
              index === progressionIndex ? bonus : currentStatus,
            ),
          );
          set(isShowing("questBonus"), true);
        }
      },
  );
}
