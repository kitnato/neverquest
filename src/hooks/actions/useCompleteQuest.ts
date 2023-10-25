import { useRecoilCallback } from "recoil";

import { canCompleteQuest, questCompletion } from "@neverquest/state/journal";
import type { Quest, QuestBonus } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteQuest() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ bonus, quest }: { bonus: QuestBonus; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canCompleteQuest(quest))) {
          return;
        }

        set(questCompletion(quest), bonus);
      },
  );
}
