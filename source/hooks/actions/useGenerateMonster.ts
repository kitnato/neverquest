import { generateCreature, generateName } from "@kitnato/locran";
import { useRecoilCallback } from "recoil";

import { attackDuration, isAttacking } from "@neverquest/state/character";
import { encounter } from "@neverquest/state/encounter";
import {
  distance,
  isMonsterNew,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterHealth,
  monsterName,
  monsterRegenerationDuration,
} from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { MONSTER_AILMENT_TYPES } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAffixStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const encounterValue = get(encounter);

        switch (encounterValue) {
          case "boss": {
            set(monsterName, generateName({ hasTitle: true }));
            break;
          }

          case "monster": {
            set(monsterName, generateCreature({ affixStructure: getAffixStructure() }));
            break;
          }

          default: {
            set(monsterName, capitalizeAll(encounterValue));
          }
        }

        reset(monsterHealth);
        reset(monsterRegenerationDuration);
        reset(distance);

        for (const ailment of MONSTER_AILMENT_TYPES) {
          reset(monsterAilmentDuration(ailment));
        }

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(attackDuration, get(attackRate));
          set(monsterAttackDuration, get(monsterAttackRate));
        } else {
          reset(monsterAttackDuration);
        }
      },
    [],
  );
}
