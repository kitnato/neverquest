import { useRecoilCallback } from "recoil";

import { MASTERY_DELTA_TYPE } from "@neverquest/data/masteries";
import { deltas } from "@neverquest/state/deltas";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import type { Mastery } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseMastery() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (type: Mastery) => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMasteryAtMaximum(type))) {
          return;
        }

        const { progress } = get(masteries(type));
        const masteryCostValue = get(masteryCost(type));

        const deltaType = MASTERY_DELTA_TYPE[type];
        const newProgress = progress + 1;

        if (newProgress === masteryCostValue) {
          set(masteries(type), ({ rank }) => ({
            progress: 0,
            rank: rank + 1,
          }));

          set(deltas(deltaType), {
            color: "text-success",
            value: "+1",
          });
        } else {
          set(masteries(type), (current) => ({
            ...current,
            progress: newProgress,
          }));

          set(deltas(deltaType), {
            color: "text-success",
            value: "RANK UP",
          });
        }
      },
    []
  );
}
