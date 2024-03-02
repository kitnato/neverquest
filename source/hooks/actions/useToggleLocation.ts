import { useRecoilCallback } from "recoil";

import { RETIREMENT_STAGE } from "@neverquest/data/general";
import { useCompleteStage } from "@neverquest/hooks/actions/useCompleteStage";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { blacksmithOptions, fletcherOptions } from "@neverquest/state/caravan";
import { isStageCompleted, location, stage, stageMaximum } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const completeStage = useCompleteStage();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageMaximumValue = get(stageMaximum);

        if (get(location) === "wilderness") {
          completeStage();

          set(isShowing("location"), true);
          set(location, "caravan");

          if (stageMaximumValue >= RETIREMENT_STAGE) {
            set(isShowing("retire"), true);
          }
        } else {
          if (get(isStageCompleted) && get(stage) === stageMaximumValue) {
            reset(blacksmithOptions);
            reset(fletcherOptions);
          }

          increaseStage();
          resetWilderness();

          set(location, "wilderness");
        }
      },
    [completeStage, increaseStage, resetWilderness],
  );
}
