import { useRecoilCallback } from "recoil";

import { MASTERY_RANK_MAXIMUM } from "@neverquest/data/masteries";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import {
  isMasteryAtMaximum,
  isMasteryUnlocked,
  masteryCost,
  masteryProgress,
  masteryRank,
} from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseMastery() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (mastery: Mastery) => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMasteryAtMaximum(mastery))) {
          return;
        }

        const isMasteryUnlockedValue = get(isMasteryUnlocked(mastery));
        const masteryProgressValue = get(masteryProgress(mastery));

        if (!isMasteryUnlockedValue) {
          return;
        }

        const masteryCostValue = get(masteryCost(mastery));
        const newProgress = masteryProgressValue + 1;

        set(masteryProgress(mastery), newProgress);

        if (newProgress === masteryCostValue) {
          const newRank = get(masteryRank(mastery)) + 1;

          set(masteryRank(mastery), newRank);
          reset(masteryProgress(mastery));

          progressQuest({ quest: "masteriesRank" });

          if (newRank === MASTERY_RANK_MAXIMUM) {
            progressQuest({ quest: "masteriesRankMaximum" });
          }
        }
      },
    [progressQuest],
  );
}
