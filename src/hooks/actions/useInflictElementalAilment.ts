import { useRecoilCallback } from "recoil";

import { ELEMENTALS } from "@neverquest/data/inventory";
import { AILMENT_DURATION_MAXIMUM } from "@neverquest/data/monster";
import { weaponElementalEffects } from "@neverquest/state/inventory";
import { canReceiveAilment, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInflictElementalAilment() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (elemental: Elemental) => {
        const get = getSnapshotGetter(snapshot);

        const { ailment } = ELEMENTALS[elemental];
        const { duration } = get(weaponElementalEffects)[elemental];

        if (get(canReceiveAilment(ailment))) {
          set(monsterAilmentDuration(ailment), (current) => {
            const newDuration = current + duration;

            if (newDuration > AILMENT_DURATION_MAXIMUM) {
              return AILMENT_DURATION_MAXIMUM;
            }

            return newDuration;
          });
        }
      },
    [],
  );
}
