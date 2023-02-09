import { useRecoilCallback } from "recoil";

import { useCreateMonster } from "@neverquest/hooks/actions/useCreateMonster";
import { isLevelCompleted, progress } from "@neverquest/state/encounter";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const createMonster = useCreateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!get(isLevelCompleted)) {
          set(progress, (current) => current + 1);

          createMonster();
        }
      },
    [createMonster]
  );
}
