import { useRecoilCallback } from "recoil";

import { QUESTS } from "@neverquest/data/journal";
import { questProgress, questStatus } from "@neverquest/state/journal";
import type { Quest, QuestProgression } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressQuest() {
  return useRecoilCallback(({ set, snapshot }) => (quest: Quest) => {
    const get = getSnapshotGetter(snapshot);

    const questProgressState = questProgress(quest);
    const questStatusState = questStatus(quest);
    const questStatusValue = get(questStatusState);

    const newProgress = get(questProgressState) + 1;

    set(questProgressState, newProgress);

    Object.keys(questStatusValue).forEach((currentOuterStatus) => {
      const index = currentOuterStatus as QuestProgression;
      const data = QUESTS[quest][index];

      if (
        data !== undefined &&
        questStatusValue[index] === false &&
        newProgress >= data.progressionMaximum
      ) {
        set(questStatusState, (currentInnerStatus) => ({ ...currentInnerStatus, [index]: true }));
      }
    });
  });
}
