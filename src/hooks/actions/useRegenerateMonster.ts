import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { currentHealthMonster, maximumHealthMonster } from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";
import { FloatingText } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const maximumHealthMonsterValue = get(maximumHealthMonster);
    const difference = maximumHealthMonsterValue - get(currentHealthMonster);

    if (difference > 0) {
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Positive,
        value: `+${difference}`,
      });
    }

    set(currentHealthMonster, maximumHealthMonsterValue);
  });
}
