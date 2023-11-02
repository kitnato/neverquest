import { useRecoilCallback } from "recoil";

import { QUESTS } from "@neverquest/data/quests";
import { ownedItem } from "@neverquest/state/items";
import { questNotification, questProgress, questStatus } from "@neverquest/state/quests";
import type { Quest, QuestProgression } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressQuest() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ amount = 1, quest }: { amount?: number; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        if (get(ownedItem("journal")) === null) {
          return;
        }

        const questProgressState = questProgress(quest);
        const questStatusState = questStatus(quest);
        const questStatusValue = get(questStatusState);

        const newProgress = get(questProgressState) + amount;

        set(questProgressState, newProgress);

        Object.keys(questStatusValue).forEach((currentOuterStatus) => {
          const index = currentOuterStatus as QuestProgression;
          const data = QUESTS[quest][index];

          if (
            data !== undefined &&
            questStatusValue[index] === false &&
            newProgress >= data.progressionMaximum
          ) {
            set(questStatusState, (currentInnerStatus) => ({
              ...currentInnerStatus,
              [index]: true,
            }));

            set(questNotification, { progression: index, quest });
          }
        });
      },
  );
}
