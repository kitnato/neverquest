import { useRecoilCallback } from "recoil";

import { CREW } from "@neverquest/data/caravan";
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

        const { shows } = CREW[crew];
        const otherHirableCrew = CREW_TYPES.filter(
          (crewType) => crewType !== crew || crewType !== "merchant",
        );

        set(hireStatus(crew), "hired");
        transactEssence(-price);

        if (shows !== undefined) {
          for (const show of shows) {
            set(isShowing(show), true);
          }
        }

        progressQuest({ quest: "hiring" });
        progressQuest({ quest: "hiringAll" });

        if (otherHirableCrew.every((hirableCrew) => get(hireStatus(hirableCrew)) !== "hired")) {
          progressQuest({ quest: "hiringBlacksmithFirst" });
        }
      },
    [progressQuest],
  );
}
