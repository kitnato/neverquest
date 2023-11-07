import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { ownedItem } from "@neverquest/state/inventory";
import {
  canUseJournal,
  questNotifications,
  questProgress,
  questStatuses,
} from "@neverquest/state/quests";
import type { QuestNotification } from "@neverquest/types";
import type { Quest } from "@neverquest/types/unions";
import { getQuestsData, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressQuest() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ amount = 1, quest }: { amount?: number; quest: Quest }) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canUseJournal) || get(ownedItem("journal")) === null) {
          return;
        }

        const questProgressState = questProgress(quest);
        const questStatusesState = questStatuses(quest);

        const quests = getQuestsData(quest);

        const newProgress = get(questProgressState) + amount;

        set(questProgressState, newProgress);

        const achievedQuests: QuestNotification[] = [];

        set(questStatusesState, (currentStatuses) =>
          currentStatuses.map((currentStatus, index) => {
            const currentQuest = quests[index];

            if (
              currentQuest !== undefined &&
              currentStatus === false &&
              newProgress >= currentQuest.progressionMaximum
            ) {
              achievedQuests.unshift({ ...currentQuest, ID: nanoid() });

              return true;
            }

            return currentStatus;
          }),
        );

        set(questNotifications, (current) => [...achievedQuests, ...current]);
      },
    [],
  );
}
