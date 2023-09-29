import { useRecoilCallback } from "recoil";

import { MASTERY_PROGRESS } from "@neverquest/data/masteries";
import { deltas } from "@neverquest/state/deltas";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseMastery() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (mastery: Mastery) => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMasteryAtMaximum(mastery))) {
          return;
        }

        const { isUnlocked, progress } = get(masteries(mastery));

        if (!isUnlocked) {
          return;
        }

        const masteryCostValue = get(masteryCost(mastery));
        const { increment } = MASTERY_PROGRESS;
        const newProgress = progress + increment;

        if (newProgress === masteryCostValue) {
          set(masteries(mastery), ({ rank, ...current }) => ({
            ...current,
            progress: 0,
            rank: rank + MASTERY_PROGRESS.rank,
          }));

          set(deltas(mastery), {
            color: "text-success",
            value: "RANK UP",
          });
        } else {
          set(masteries(mastery), (current) => ({
            ...current,
            progress: newProgress,
          }));

          set(deltas(mastery), {
            color: "text-success",
            value: `+${increment}`,
          });
        }
      },
    [],
  );
}
