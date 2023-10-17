import { useRecoilCallback } from "recoil";

import { MONSTER_NAME } from "@neverquest/data/monster";
import { generateCreature } from "@neverquest/LOCRAN/generate/generateCreature";
import { generateName } from "@neverquest/LOCRAN/generate/generateName";
import { isAttacking } from "@neverquest/state/character";
import { isBoss, stage } from "@neverquest/state/encounter";
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
import { getFromRange, getGrowthSigmoid, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  const { prefix, suffix } = MONSTER_NAME;

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const allowNSFWValue = get(allowNSFW);
        const factor = getGrowthSigmoid(get(stage));

        set(
          monsterName,
          get(isBoss)
            ? generateName({ allowNSFW: allowNSFWValue, hasTitle: true })
            : generateCreature({
                allowNSFW: allowNSFWValue,
                hasPrefix:
                  Math.random() <=
                  getFromRange({
                    factor,
                    maximum: prefix.maximum,
                    minimum: prefix.minimum,
                  }),
                hasSuffix:
                  Math.random() <=
                  getFromRange({
                    factor,
                    maximum: suffix.maximum,
                    minimum: suffix.minimum,
                  }),
                type: ["human", "monster"],
              }),
        );

        reset(monsterHealth);
        reset(distance);

        MONSTER_AILMENT_TYPES.forEach((current) => reset(monsterAilmentDuration(current)));

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [],
  );
}
