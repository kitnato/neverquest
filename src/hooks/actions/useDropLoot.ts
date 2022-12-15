import { useRecoilCallback, useSetRecoilState } from "recoil";

import { isLooting } from "@neverquest/state/character";
import { progress } from "@neverquest/state/encounter";
import { monsterLoot } from "@neverquest/state/monster";
import { essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const setLooting = useSetRecoilState(isLooting);

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const { essence, scrap } = get(monsterLoot);

    if (essence > 0) {
      set(essenceLoot, (current) => current + essence);
    }

    if (scrap > 0) {
      set(scrapLoot, (current) => current + scrap);
    }

    setLooting(false);
    set(progress, (current) => current + 1);
  });
}
