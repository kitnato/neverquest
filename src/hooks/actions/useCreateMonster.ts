import { useRecoilCallback } from "recoil";

import LOCRA from "@neverquest/locra";
import { CreatureType } from "@neverquest/locra/types";
import { isAttacking } from "@neverquest/state/character";
import { level } from "@neverquest/state/encounter";
import {
  isMonsterNew,
  monsterAttackDuration,
  monsterAttackRate,
  monsterCurrentHealth,
  monsterName,
} from "@neverquest/state/monster";
import { isNSFW } from "@neverquest/state/settings";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ reset, set, snapshot }) => () => {
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

    reset(monsterCurrentHealth);

    if (get(isAttacking)) {
      set(monsterAttackDuration, get(monsterAttackRate));
    }

    set(isMonsterNew, true);
  });
}
