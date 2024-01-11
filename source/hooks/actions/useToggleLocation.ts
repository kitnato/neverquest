import { useRecoilCallback } from "recoil";

import { useCompleteStage } from "@neverquest/hooks/actions/useCompleteStage";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { isStageCompleted, location, stage, stageMaximum } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const completeStage = useCompleteStage();
  const increaseStage = useIncreaseStage();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(location) === "wilderness") {
          completeStage();

          set(isShowing("location"), true);
          set(location, "caravan");
        } else {
          if (get(isStageCompleted) && get(stage) === get(stageMaximum)) {
            increaseStage();
          }

          set(location, "wilderness");
        }
      },
    [completeStage, increaseStage],
  );
}
