import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { hireStatus } from "@neverquest/state/caravan";
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

        const nextStage = get(stage) + 1;

        CREW_ORDER.forEach((type) => {
          const { status: hireStatusValue } = get(hireStatus(type));
          const isShowingCrewHiring = isShowing("crewHiring");

          const { requiredStage } = CREW[type];

          if (hireStatusValue === null && nextStage >= requiredStage) {
            set(hireStatus(type), { status: "hirable" });
            set(isShowingCrewHiring, true);
          }
        });

        set(wildernesses, (current) => [
          ...current,
          generateWilderness({ allowNSFW: get(allowNSFW), stage: nextStage }),
        ]);

        set(stage, nextStage);
      },
    [],
  );
}
