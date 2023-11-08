import { useRecoilCallback } from "recoil";

import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { QUEST_REQUIREMENTS } from "@neverquest/data/quests";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { hireStatus } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const nextStage = get(stage) + 1;

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

        if (nextStage === QUEST_REQUIREMENTS.stagesEnd) {
          progressQuest({ quest: "stagesEnd" });
        }
      },
    [progressQuest],
  );
}
