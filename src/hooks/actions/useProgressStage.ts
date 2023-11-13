import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { GEM_BASE } from "@neverquest/data/inventory";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { isAttacking } from "@neverquest/state/character";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { isMonsterNew, monsterLoot } from "@neverquest/state/monster";
import { essenceLoot, itemsLoot } from "@neverquest/state/resources";
import { GEM_TYPES } from "@neverquest/types/unions";
import { getFromRange, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressStage() {
  const toggleAttack = useToggleAttack();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { essence, gems } = get(monsterLoot);

        if (essence > 0) {
          set(essenceLoot, (current) => current + essence);
        }

        if (gems > 0) {
          set(itemsLoot, (current) => [
            ...current,
            ...[Array.from({ length: gems })].map(() => ({
              ...GEM_BASE,
              ID: nanoid(),
              name:
                GEM_TYPES[getFromRange({ maximum: GEM_TYPES.length - 1, minimum: 0 })] ?? "ruby",
            })),
          ]);
        }

        const nextProgress = get(progress) + 1;

        set(progress, nextProgress);

        if (nextProgress < get(progressMaximum)) {
          reset(isMonsterNew);
        } else if (get(isAttacking)) {
          toggleAttack();
        }
      },
    [toggleAttack],
  );
}
