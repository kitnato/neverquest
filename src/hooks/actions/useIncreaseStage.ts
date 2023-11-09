import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { hireStatus } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { allowNSFW } from "@neverquest/state/settings";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);
        const nextStage = stageValue + 1;

        CREW_ORDER.forEach((type) => {
          const { current: hireStatusCurrent } = get(hireStatus(type));
          const isShowingCrewHiring = isShowing("crewHiring");

          const { requiredStage } = CREW[type];

          if (hireStatusCurrent === null && nextStage >= requiredStage) {
            set(hireStatus(type), { current: "hirable" });
            set(isShowingCrewHiring, true);
          }
        });

        set(wildernesses, (current) => [
          ...current,
          generateLocation({
            allowNSFW: get(allowNSFW),
            nameStructure: getNameStructure(),
          }),
        ]);

        set(stage, nextStage);

        progressQuest({ quest: "stages" });
        progressQuest({ quest: "stagesEnd" });

        if (stageValue === get(questProgress("survivingNoAttributes")) + 1) {
          progressQuest({ quest: "survivingNoAttributes" });
        }

        if (stageValue === get(questProgress("survivingNoGear")) + 1) {
          progressQuest({ quest: "survivingNoGear" });
        }
      },
    [progressQuest],
  );
}
