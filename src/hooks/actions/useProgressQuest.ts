import { useRecoilCallback } from "recoil";

import { ownedItem } from "@neverquest/state/items";
import {
  activeQuests,
  questNotification,
  questProgress,
  questStatus,
} from "@neverquest/state/quests";
import type { Quest } from "@neverquest/types/unions";
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
        const activeQuestsValue = get(activeQuests(quest));

        const newProgress = get(questProgressState) + amount;

        set(questProgressState, newProgress);

        set(questStatus(quest), (current) =>
          current.map((currentStatus, index) => {
            const activeQuest = activeQuestsValue[index];

            if (activeQuest === undefined) {
              return currentStatus;
            }

            if (currentStatus === false && newProgress >= activeQuest.progressionMaximum) {
              set(questNotification, activeQuest);

              return true;
            }

            return currentStatus;
          }),
        );
      },
  );
}
