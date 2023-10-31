import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { questStatus } from "@neverquest/state/quests";
import type { Quest, QuestBonus, QuestProgression } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteQuest() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({
        bonus,
        progression,
        quest,
      }: {
        bonus: QuestBonus;
        progression: QuestProgression;
        quest: Quest;
      }) => {
        const get = getSnapshotGetter(snapshot);

        if (get(questStatus(quest))[progression] === true) {
          set(questStatus(quest), (current) => ({ ...current, [progression]: bonus }));
          set(isShowing("questBonus"), true);
        }
      },
  );
}
