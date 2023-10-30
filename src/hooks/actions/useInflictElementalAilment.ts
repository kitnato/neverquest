import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "./useProgressQuest";
import { ELEMENTALS } from "@neverquest/data/inventory";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/statistics";
import { totalElementalEffects } from "@neverquest/state/gear";
import { canReceiveAilment, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInflictElementalAilment() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ elemental, slot }: { elemental: Elemental; slot: "armor" | "weapon" }) => {
        const get = getSnapshotGetter(snapshot);

        const { ailment } = ELEMENTALS[elemental];
        const { duration } = get(totalElementalEffects)[slot][elemental];

        if (get(canReceiveAilment(ailment)) && duration > 0) {
          set(monsterAilmentDuration(ailment), (current) => {
            const newDuration = current + duration;

            if (newDuration > ELEMENTAL_AILMENT_DURATION_MAXIMUM) {
              return ELEMENTAL_AILMENT_DURATION_MAXIMUM;
            }

            return newDuration;
          });

          switch (ailment) {
            case "burning": {
              progressQuest("burning");
              break;
            }

            case "frozen": {
              progressQuest("freezing");
              break;
            }

            case "shocked": {
              progressQuest("shocking");
              break;
            }
          }
        }
      },
    [progressQuest],
  );
}
