import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { crew } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { generateWilderness } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);

        const nextStage = stageValue + 1;

        CREW_ORDER.forEach((type) => {
          const hireStatus = get(crew(type));
          const isShowingCrewHiring = isShowing("crewHiring");

          const { requiredStage } = CREW[type];

          if (hireStatus === "locked" && nextStage >= requiredStage) {
            set(crew(type), "hirable");
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
    []
  );
}
