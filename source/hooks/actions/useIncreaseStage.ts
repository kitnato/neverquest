import { generateLocation } from "@kitnato/locran";
import { useRecoilCallback } from "recoil";

import { CREW } from "@neverquest/data/caravan";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { getAffixStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  const progressQuest = useProgressQuest();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);
        const nextStage = stageValue + 1;
        const crewMemberRequiredStage = Object.values(CREW)
          .map(({ requiredStage }) => requiredStage)
          .toSorted((requiredStage1, requiredStage2) => requiredStage1 - requiredStage2)
          .find((requiredStage) => requiredStage > 1);

        if (crewMemberRequiredStage !== undefined && nextStage >= crewMemberRequiredStage) {
          set(isShowing("crewMemberHiring"), true);
        }

        progressQuest({ amount: stageValue === 1 ? 2 : 1, quest: "stages" });
        progressQuest({ amount: stageValue === 1 ? 2 : 1, quest: "stagesEnd" });

        if (stageValue === get(questProgress("survivingNoAttributes")) + 1) {
          progressQuest({ quest: "survivingNoAttributes" });
        }

        if (stageValue === get(questProgress("survivingNoGear")) + 1) {
          progressQuest({ quest: "survivingNoGear" });
        }

        set(wildernesses, (currentWildernesses) => [
          ...currentWildernesses,
          generateLocation({ affixStructure: getAffixStructure() }),
        ]);

        set(stage, nextStage);
        resetWilderness();
      },
    [progressQuest, resetWilderness],
  );
}
