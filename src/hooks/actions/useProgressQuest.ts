import { useRecoilCallback } from "recoil";

import { ownedItem } from "@neverquest/state/items";
import { questNotifications, questProgress, questStatuses, quests } from "@neverquest/state/quests";
import type { QuestData } from "@neverquest/types";
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
        const questStatusesState = questStatuses(quest);
        const questsValue = get(quests(quest));

        const newProgress = get(questProgressState) + amount;

        set(questProgressState, newProgress);

        const achievedQuests: QuestData[] = [];

        set(questStatusesState, (currentStatuses) =>
          currentStatuses.map((currentStatus, index) => {
            const quest = questsValue[index];

            if (
              quest !== undefined &&
              currentStatus === false &&
              newProgress >= quest.progressionMaximum
            ) {
              achievedQuests.push(quest);

              return true;
            }

            return currentStatus;
          }),
        );

        set(questNotifications, achievedQuests);
      },
    [],
  );
}
