import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { isShowing } from "@neverquest/state/isShowing";
import { essence } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useTransactEssence() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (difference: number) => {
        if (difference !== 0) {
          const get = getSnapshotGetter(snapshot);

          const newEssence = get(essence) + difference;

          if (difference < 0) {
            progressQuest({ amount: Math.abs(difference), quest: "spendingEssence" });
          }

          if (newEssence === 777) {
            progressQuest({ quest: "essenceCount" });
          }

          set(essence, (current) => current + difference);
          set(isShowing("essence"), true);
        }
      },
    [progressQuest],
  );
}
