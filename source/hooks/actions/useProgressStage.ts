import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking } from "@neverquest/state/character";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { canAutoProgress } from "@neverquest/state/items";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressStage() {
  const generateMonster = useGenerateMonster();
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const nextProgress = get(progress) + 1;

        set(progress, nextProgress);

        if (nextProgress < get(progressMaximum)) {
          generateMonster();
        } else if (get(isAttacking) && !get(canAutoProgress)) {
          toggleAttacking();
        }
      },
    [generateMonster, toggleAttacking],
  );
}
