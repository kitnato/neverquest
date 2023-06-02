import { useRecoilCallback } from "recoil";

import { LOCRA } from "@neverquest/LOCRA";
import { isAttacking } from "@neverquest/state/character";
import { stage } from "@neverquest/state/encounter";
import {
  isMonsterNew,
  monsterAttackDuration,
  monsterAttackRate,
  monsterHealthCurrent,
  monsterName,
} from "@neverquest/state/monster";
import { allowNSFW } from "@neverquest/state/settings";
import { getGrowthSigmoid, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);
        const growthFactor = getGrowthSigmoid(get(stage));

        set(
          monsterName,
          LOCRA.generateCreature({
            allowNSFW: get(allowNSFW),
            hasPrefix: Math.random() <= 0.6 + 0.4 * growthFactor,
            hasSuffix: Math.random() <= 0.05 + 0.75 * growthFactor,
            type: "monster",
          })
        );

        reset(monsterHealthCurrent);

        set(isMonsterNew, true);

        if (get(isAttacking)) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    []
  );
}
