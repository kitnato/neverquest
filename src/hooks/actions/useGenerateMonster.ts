import { useRecoilCallback } from "recoil";

import { generateCreature } from "@neverquest/LOCRAN/generate/generateCreature";
import { generateName } from "@neverquest/LOCRAN/generate/generateName";
import { isAttacking } from "@neverquest/state/character";
import { finality, isBoss } from "@neverquest/state/encounter";
import {
  distance,
  isMonsterNew,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterHealth,
  monsterName,
} from "@neverquest/state/monster";
import { allowProfanity } from "@neverquest/state/settings";
import { MONSTER_AILMENT_TYPES } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const allowProfanityValue = get(allowProfanity);
        const finalityValue = get(finality);

        if (finalityValue === false) {
          set(
            monsterName,
            get(isBoss)
              ? generateName({ allowProfanity: allowProfanityValue, hasTitle: true })
              : generateCreature({
                  allowProfanity: allowProfanityValue,
                  nameStructure: getNameStructure(),
                }),
          );
        } else {
          set(monsterName, capitalizeAll(finalityValue));
        }

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
