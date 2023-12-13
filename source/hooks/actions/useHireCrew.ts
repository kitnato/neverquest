import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { hireStatus } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { CREW_TYPES, type Crew } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useHireCrew() {
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ crew, price }: { crew: Crew; price: number }) => {
        const get = getSnapshotGetter(snapshot);

        const otherHirableCrew = CREW_TYPES.filter(
          (currentCrew) => currentCrew !== crew || currentCrew !== "merchant",
        );

        set(hireStatus(crew), "hired");
        transactEssence(-price);

        if (crew === "blacksmith") {
          set(isShowing("gearClass"), true);
        }

        progressQuest({ quest: "hiring" });
        progressQuest({ quest: "hiringAll" });

        if (
          otherHirableCrew.every(
            (currentHirableCrew) => get(hireStatus(currentHirableCrew)) !== "hired",
          )
        ) {
          progressQuest({ quest: "hiringBlacksmithFirst" });
        }
      },
    [progressQuest],
  );
}