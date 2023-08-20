import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { SHARD_BASE } from "@neverquest/data/inventory";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { coinsLoot, essenceLoot, itemsLoot, scrapLoot } from "@neverquest/state/resources";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getFromRange, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { coins, essence, scrap, shards } = get(monsterLoot);

        if (coins > 0) {
          set(coinsLoot, (current) => current + coins);
        }

        if (essence > 0) {
          set(essenceLoot, (current) => current + essence);
        }

        if (scrap > 0) {
          set(scrapLoot, (current) => current + scrap);
        }

        if (shards > 0) {
          set(itemsLoot, (current) =>
            current.concat(
              Array.from(Array(shards)).map(() => {
                const type = ELEMENTAL_TYPES[getFromRange({ maximum: 3, minimum: 0 })];

                return {
                  ...SHARD_BASE,
                  id: nanoid(),
                  type,
                };
              }),
            ),
          );
        }

        const nextProgress = get(progress) + 1;

        set(progress, nextProgress);

        if (nextProgress < get(progressMaximum)) {
          generateMonster();
        }
      },
    [generateMonster],
  );
}
