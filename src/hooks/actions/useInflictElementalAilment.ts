import { useRecoilCallback } from "recoil";

import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/combat";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { gearElementalEffects } from "@neverquest/state/inventory";
import { canReceiveAilment, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental, Gear } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInflictElementalAilment() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ elemental, slot }: { elemental: Elemental; slot: Exclude<Gear, "shield"> }) => {
        const get = getSnapshotGetter(snapshot);

        const { ailment } = ELEMENTALS[elemental];
        const { duration } = get(gearElementalEffects(slot))[elemental];

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
