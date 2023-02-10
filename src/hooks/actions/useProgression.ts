import { useRecoilCallback } from "recoil";

import { useCreateMonster } from "@neverquest/hooks/actions/useCreateMonster";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const createMonster = useCreateMonster();

  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isLevelCompleted)) {
          reset(isAttacking);
        } else {
          createMonster();
        }
      },
    [createMonster]
  );
}
