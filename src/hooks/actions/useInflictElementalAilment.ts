import { useRecoilCallback } from "recoil";

import { ELEMENTALS } from "@neverquest/data/inventory";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/statistics";
import { canReceiveAilment, monsterAilmentDuration } from "@neverquest/state/monster";
import { totalElementalEffects } from "@neverquest/state/statistics";
import type { Elemental, ElementalGear } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInflictElementalAilment() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ elemental, slot }: { elemental: Elemental; slot: ElementalGear }) => {
        const get = getSnapshotGetter(snapshot);

        const { ailment } = ELEMENTALS[elemental];
        const { duration } = get(totalElementalEffects(slot))[elemental];

        if (get(canReceiveAilment(ailment)) && duration > 0) {
          set(monsterAilmentDuration(ailment), (current) => {
            const newDuration = current + duration;

            if (newDuration > ELEMENTAL_AILMENT_DURATION_MAXIMUM) {
              return ELEMENTAL_AILMENT_DURATION_MAXIMUM;
            }

            return newDuration;
          });
        }
      },
    [],
  );
}
