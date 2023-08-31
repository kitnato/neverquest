import { useRecoilCallback } from "recoil";

import { MONSTER_NAME } from "@neverquest/data/monster";
import { generateCreature } from "@neverquest/LOCRAN/generate/generateCreature";
import { generateName } from "@neverquest/LOCRAN/generate/generateName";
import { isAttacking } from "@neverquest/state/character";
import { isBoss, stage } from "@neverquest/state/encounter";
import {
  isMonsterNew,
  monsterAttackDuration,
  monsterAttackRate,
  monsterHealth,
  monsterName,
} from "@neverquest/state/monster";
import { allowNSFW } from "@neverquest/state/settings";
import { getGrowthSigmoid, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  const { prefix, suffix } = MONSTER_NAME;

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const allowNSFWValue = get(allowNSFW);
        const growthFactor = getGrowthSigmoid(get(stage));

        set(
          monsterName,
          get(isBoss)
            ? generateName({ allowNSFW: allowNSFWValue, hasTitle: true })
            : generateCreature({
                allowNSFW: allowNSFWValue,
                hasPrefix: Math.random() <= prefix + (1 - prefix) * growthFactor,
                hasSuffix: Math.random() <= suffix + (1 - suffix) * growthFactor,
                type: ["monster"],
              }),
        );

        reset(monsterHealth);

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [],
  );
}
