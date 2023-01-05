import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { isMasteryAtMaximum, masteries, masteryCost } from "@neverquest/state/masteries";
import { MasteryType } from "@neverquest/types/enums";
import { FloatingText } from "@neverquest/types/ui";
import { getDeltaTypeFromMasteryType, getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => (type: MasteryType) => {
    const get = getSnapshotGetter(snapshot);

    if (isMasteryAtMaximum(type)) {
      return;
    }

    const { progress } = get(masteries(type));
    const masteryCostValue = get(masteryCost(type));

    const deltaType = getDeltaTypeFromMasteryType(type);
    const newProgress = progress + 1;

    if (newProgress === masteryCostValue) {
      set(masteries(type), ({ rank }) => ({
        progress: 0,
        rank: rank + 1,
      }));

      set(deltas(deltaType), {
        color: FloatingText.Positive,
        value: "+1",
      });
    } else {
      set(masteries(type), (current) => ({
        ...current,
        progress: newProgress,
      }));

      set(deltas(deltaType), {
        color: FloatingText.Positive,
        value: "RANK UP",
      });
    }
  });
}
