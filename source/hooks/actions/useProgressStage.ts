import { useRecoilCallback } from "recoil";

import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking } from "@neverquest/state/character";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { canAutoProgress } from "@neverquest/state/items";
import { isMonsterNew } from "@neverquest/state/monster";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressStage() {
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const nextProgress = get(progress) + 1;

        set(progress, nextProgress);

        if (nextProgress < get(progressMaximum)) {
          reset(isMonsterNew);
        } else if (get(isAttacking) && !get(canAutoProgress)) {
          toggleAttacking();
        }
      },
    [toggleAttacking],
  );
}
