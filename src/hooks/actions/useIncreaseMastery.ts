import { useRecoilCallback } from "recoil";

import { MASTERY_PROGRESS } from "@neverquest/data/masteries";
import { deltas } from "@neverquest/state/deltas";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseMastery() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (type: Mastery) => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMasteryAtMaximum(type))) {
          return;
        }

        const { isUnlocked, progress } = get(masteries(type));

        if (!isUnlocked) {
          return;
        }

        const masteryCostValue = get(masteryCost(type));
        const { increment } = MASTERY_PROGRESS;
        const newProgress = progress + increment;

        if (newProgress === masteryCostValue) {
          set(masteries(type), ({ rank, ...current }) => ({
            ...current,
            progress: 0,
            rank: rank + MASTERY_PROGRESS.rank,
          }));

          set(deltas(type), {
            color: "text-success",
            value: "RANK UP",
          });
        } else {
          set(masteries(type), (current) => ({
            ...current,
            progress: newProgress,
          }));

          set(deltas(type), {
            color: "text-success",
            value: `+${increment}`,
          });
        }
      },
    [],
  );
}
