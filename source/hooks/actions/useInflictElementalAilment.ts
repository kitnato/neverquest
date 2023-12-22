import { useRecoilCallback } from "recoil";

import { ELEMENTALS } from "@neverquest/data/items";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { canReceiveAilment } from "@neverquest/state/ailments";
import { elementalEffects } from "@neverquest/state/gear";
import { monsterAilmentDuration } from "@neverquest/state/monster";
import type { Elemental } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInflictElementalAilment() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ elemental, slot }: { elemental: Elemental; slot: "armor" | "weapon" }) => {
        const get = getSnapshotGetter(snapshot);

        const { ailment, durationCap } = ELEMENTALS[elemental];
        const { duration } = get(elementalEffects)[slot][elemental];

        if (get(canReceiveAilment(ailment)) && duration > 0) {
          set(monsterAilmentDuration(ailment), (ailmentDuration) => {
            const newDuration = ailmentDuration + duration;

            if (newDuration > durationCap) {
              return durationCap;
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
