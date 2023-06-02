import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { crew } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { CrewStatus, Showing } from "@neverquest/types/enums";
import { generateWilderness } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  const createMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);

        const nextStage = stageValue + 1;

        CREW_ORDER.forEach((type) => {
          const { hireStatus, monologueProgress } = get(crew(type));
          const isShowingCrewHiring = isShowing(Showing.CrewHiring);

          const { monologues, requiredStage } = CREW[type];

          // Progress the monologue for all hired crew members.
          if (hireStatus === CrewStatus.Hired && monologueProgress < monologues.length - 1) {
            set(crew(type), (current) => ({
              ...current,
              monologueProgress: current.monologueProgress + 1,
            }));
          }

          // Make crew member hirable if the appropriate level has been reached.
          if (hireStatus === CrewStatus.Locked && nextStage >= requiredStage) {
            set(crew(type), (current) => ({
              ...current,
              hireStatus: CrewStatus.Hirable,
            }));

            set(isShowingCrewHiring, true);
          }
        });

        if (!get(wildernesses)[nextStage - 1]) {
          set(wildernesses, (current) => [
            ...current,
            generateWilderness({ allowNSFW: get(allowNSFW), stage: nextStage }),
          ]);
        }

        set(stage, nextStage);
      },
    [createMonster]
  );
}
