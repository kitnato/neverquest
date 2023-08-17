import { useRecoilCallback } from "recoil";

import { MONSTER_NAME } from "@neverquest/data/monster";
import { LOCRA } from "@neverquest/LOCRA";
import { isAttacking } from "@neverquest/state/character";
import { stage } from "@neverquest/state/encounter";
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

        const growthFactor = getGrowthSigmoid(get(stage));

        set(
          monsterName,
          LOCRA.generateCreature({
            allowNSFW: get(allowNSFW),
            hasPrefix: Math.random() <= prefix + (1 - prefix) * growthFactor,
            hasSuffix: Math.random() <= suffix + (1 - suffix) * growthFactor,
            type: ["human", "monster"],
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
