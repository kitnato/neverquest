import { useRecoilCallback } from "recoil";

import { ELEMENTALS } from "@neverquest/data/items";
import { ELEMENTAL_AILMENT_DURATION_MAXIMUM } from "@neverquest/data/statistics";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { canReceiveAilment } from "@neverquest/state/ailments";
import { totalElementalEffects } from "@neverquest/state/gear";
import { monsterAilmentDuration } from "@neverquest/state/monster";
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
            const maximumDuration = ELEMENTAL_AILMENT_DURATION_MAXIMUM[ailment];

            if (newDuration > maximumDuration) {
              return maximumDuration;
            }

            return newDuration;
          });

          switch (ailment) {
            case "burning": {
              progressQuest({ quest: "burning" });
              break;
            }

            case "frozen": {
              progressQuest({ quest: "freezing" });
              break;
            }

            case "shocked": {
              progressQuest({ quest: "shocking" });
              break;
            }
          }
        }
      },
    [progressQuest],
  );
}
