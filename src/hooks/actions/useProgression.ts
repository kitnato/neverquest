import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { attackDuration, isAttacking } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const createMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isLevelCompleted)) {
          reset(attackDuration);
          reset(isAttacking);
        } else {
          createMonster();
        }
      },
    [createMonster]
  );
}
