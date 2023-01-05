import { useRecoilCallback } from "recoil";

import LOCRA from "@neverquest/locra";
import { CreatureType } from "@neverquest/locra/types";
import { level } from "@neverquest/state/encounter";
import {
  isMonsterNew,
  monsterCurrentHealth,
  monsterMaximumHealth,
  monsterName,
} from "@neverquest/state/monster";
import { isNSFW } from "@neverquest/state/settings";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    set(
      monsterName,
      LOCRA.generateCreature({
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(get(level) / 2),
        isNSFW: get(isNSFW),
        type: CreatureType.Monster,
      })
    );

    set(monsterCurrentHealth, get(monsterMaximumHealth));
    set(isMonsterNew, true);
  });
}
