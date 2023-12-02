import { useRecoilCallback } from "recoil";

import { LEVEL_MAXIMUM } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import {
  canTrainMastery,
  isMasteryAtMaximum,
  masteryCost,
  masteryProgress,
  masteryRank,
} from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useTrainMastery() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (mastery: Mastery) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canTrainMastery(mastery)) || get(isMasteryAtMaximum(mastery))) {
          return;
        }

        const newProgress = get(masteryProgress(mastery)) + 1;

        if (newProgress === get(masteryCost(mastery))) {
          const newRank = get(masteryRank(mastery)) + 1;

          set(masteryRank(mastery), newRank);
          reset(masteryProgress(mastery));

          progressQuest({ quest: "masteriesRank" });

          if (newRank === LEVEL_MAXIMUM) {
            progressQuest({ quest: "masteriesRankMaximum" });
          }
        } else {
          set(masteryProgress(mastery), newProgress);
        }
      },
    [progressQuest],
  );
}
