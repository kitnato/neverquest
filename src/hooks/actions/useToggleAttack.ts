import { useRecoilCallback } from "recoil";

import { isAttacking } from "@neverquest/state/character";
import { isLevelStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleAttack() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const deltaShowWildernessStatus = isShowing(ShowingType.WildernessStatus);

        if (!get(isLevelStarted)) {
          set(isLevelStarted, true);
        }

        if (!get(deltaShowWildernessStatus)) {
          set(deltaShowWildernessStatus, true);
        }

        set(isAttacking, (current) => !current);
      },
    []
  );
}
