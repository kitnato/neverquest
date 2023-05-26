import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { crew } from "@neverquest/state/caravan";
import { level, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { CrewStatus, Showing } from "@neverquest/types/enums";
import { generateLocation } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseLevel() {
  const createMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const levelValue = get(level);
        const nextLevel = levelValue + 1;

        CREW_ORDER.forEach((type) => {
          const { hireStatus, monologueProgress } = get(crew(type));
          const isShowingCrewHiring = isShowing(Showing.CrewHiring);

          const { hirableLevel, monologues } = CREW[type];

          // Progress the monologue for all hired crew members.
          if (hireStatus === CrewStatus.Hired && monologueProgress < monologues.length - 1) {
            set(crew(type), (current) => ({
              ...current,
              monologueProgress: current.monologueProgress + 1,
            }));
          }

          // Make crew member hirable if the appropriate level has been reached.
          if (hireStatus === CrewStatus.Locked && nextLevel >= hirableLevel) {
            set(crew(type), (current) => ({
              ...current,
              hireStatus: CrewStatus.Hirable,
            }));

            if (!get(isShowingCrewHiring)) {
              set(isShowingCrewHiring, true);
            }
          }
        });

        if (!get(wildernesses)[nextLevel - 1]) {
          set(wildernesses, (current) => [
            ...current,
            generateLocation({ allowNSFW: get(allowNSFW), level: nextLevel }),
          ]);
        }

        set(level, nextLevel);
      },
    [createMonster]
  );
}
