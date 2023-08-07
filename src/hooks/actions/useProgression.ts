import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { progress, progressMaximum } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { coinsLoot, essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgression() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { coins, essence, scrap } = get(monsterLoot);

        if (coins > 0) {
          set(coinsLoot, (current) => current + coins);
        }

        if (essence > 0) {
          set(essenceLoot, (current) => current + essence);
        }

        if (scrap > 0) {
          set(scrapLoot, (current) => current + scrap);
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
