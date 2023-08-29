import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { GEM_BASE } from "@neverquest/data/inventory";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { isAttacking } from "@neverquest/state/character";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { coinsLoot, essenceLoot, itemsLoot, scrapLoot } from "@neverquest/state/resources";
import type { GemItem } from "@neverquest/types";
import { GEM_TYPES } from "@neverquest/types/unions";
import { getFromRange, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const generateMonster = useGenerateMonster();
  const toggleAttack = useToggleAttack();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { coins, essence, gems, scrap } = get(monsterLoot);

        if (coins > 0) {
          set(coinsLoot, (current) => current + coins);
        }

        if (essence > 0) {
          set(essenceLoot, (current) => current + essence);
        }

        if (scrap > 0) {
          set(scrapLoot, (current) => current + scrap);
        }

        if (gems > 0) {
          const gemsLoot: GemItem[] = Array.from(Array(gems)).map(() => ({
            ...GEM_BASE,
            id: nanoid(),
            type: GEM_TYPES[getFromRange({ maximum: 3, minimum: 0 })],
          }));

          set(itemsLoot, (current) => current.concat(gemsLoot));
        }

        const nextProgress = get(progress) + 1;

        set(progress, nextProgress);

        if (nextProgress < get(progressMaximum)) {
          generateMonster();
        } else if (get(isAttacking)) {
          toggleAttack();
        }
      },
    [generateMonster, toggleAttack],
  );
}
