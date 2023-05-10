import { useRecoilCallback } from "recoil";

import { LOCRA } from "@neverquest/LOCRA";
import { isAttacking } from "@neverquest/state/character";
import { level } from "@neverquest/state/encounter";
import {
  isMonsterNew,
  monsterAttackDuration,
  monsterAttackRate,
  monsterCurrentHealth,
  monsterName,
} from "@neverquest/state/monster";
import { allowNSFW } from "@neverquest/state/settings";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCreateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        set(
          monsterName,
          LOCRA.generateCreature({
            allowNSFW: get(allowNSFW),
            hasPrefix: Math.random() < 0.8,
            hasSuffix: Math.random() < 0.1 * Math.round(get(level) / 2),
            type: "monster",
          })
        );

        reset(monsterCurrentHealth);

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    []
  );
}
