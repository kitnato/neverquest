import { useRecoilCallback } from "recoil";

import { generateCreature } from "@neverquest/LOCRAN/generate/generateCreature";
import { generateName } from "@neverquest/LOCRAN/generate/generateName";
import { isAttacking } from "@neverquest/state/character";
import { isBoss } from "@neverquest/state/encounter";
import {
  distance,
  isMonsterNew,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterHealth,
  monsterName,
} from "@neverquest/state/monster";
import { allowNSFW } from "@neverquest/state/settings";
import { MONSTER_AILMENT_TYPES } from "@neverquest/types/unions";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const allowNSFWValue = get(allowNSFW);

        set(
          monsterName,
          get(isBoss)
            ? generateName({ allowNSFW: allowNSFWValue, hasTitle: true })
            : generateCreature({
                allowNSFW: allowNSFWValue,
                nameStructure: getNameStructure(),
              }),
        );

        reset(monsterHealth);
        reset(distance);

        for (const current of MONSTER_AILMENT_TYPES) {
          reset(monsterAilmentDuration(current));
        }

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [],
  );
}
