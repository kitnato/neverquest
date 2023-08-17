import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { SHARDS, SHARD_BASE } from "@neverquest/data/inventory";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { coinsLoot, essenceLoot, itemsLoot, scrapLoot } from "@neverquest/state/resources";
import { SHARD_TYPES } from "@neverquest/types/unions";
import { TEMPLATE_PATTERN } from "@neverquest/utilities/constants";
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
          const { coinPrice, descriptionTemplate, weight } = SHARD_BASE;

          set(itemsLoot, (current) =>
            current.concat(
              Array.from(Array(shards)).map(() => {
                const type = SHARD_TYPES[getFromRange({ maximum: 3, minimum: 0 })];

                return {
                  coinPrice,
                  description: descriptionTemplate.replace(TEMPLATE_PATTERN, SHARDS[type]),
                  id: nanoid(),
                  type,
                  weight,
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
