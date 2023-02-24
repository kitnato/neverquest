import { useRecoilCallback } from "recoil";

import { MASTERY_DELTA_TYPE } from "@neverquest/data/masteries";
import { deltas } from "@neverquest/state/deltas";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import { MasteryType } from "@neverquest/types/enums";
import { FloatingTextVariant } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseMastery() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (type: MasteryType) => {
        const get = getSnapshotGetter(snapshot);

        if (isMasteryAtMaximum(type)) {
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
            color: FloatingTextVariant.Positive,
            value: "+1",
          });
        } else {
          set(masteries(type), (current) => ({
            ...current,
            progress: newProgress,
          }));

          set(deltas(deltaType), {
            color: FloatingTextVariant.Positive,
            value: "RANK UP",
          });
        }
      },
    []
  );
}
