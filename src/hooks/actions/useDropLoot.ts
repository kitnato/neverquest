import { useRecoilCallback } from "recoil";

import { progress } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterLoot } from "@neverquest/state/monster";
import { essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { ShowingType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const { essence, scrap } = get(monsterLoot);

    if (essence > 0) {
      set(essenceLoot, (current) => current + essence);
    }

    if (scrap > 0) {
      set(scrapLoot, (current) => current + scrap);
    }

    set(progress, (current) => current + 1);

    if (!get(isShowing(ShowingType.Attributes))) {
      set(isShowing(ShowingType.Attributes), true);
    }
  });
}
