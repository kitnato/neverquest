import { useRecoilCallback } from "recoil";

import { progress } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { coinsLoot, essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useDropLoot() {
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

        set(progress, (current) => current + 1);
      },
    []
  );
}
