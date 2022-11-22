import { useRecoilCallback } from "recoil";

import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/constants/caravan";
import { crew } from "@neverquest/state/caravan";
import { level, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { isNSFW } from "@neverquest/state/settings";
import { CrewStatus, ShowingType } from "@neverquest/types/enums";
import { generateLocation } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const levelValue = get(level);
    const nextLevel = levelValue + 1;

    CREW_ORDER.forEach((type) => {
      const { hireStatus, monologueProgress } = get(crew(type));
      const isShowingCrewHiring = isShowing(ShowingType.CrewHiring);

      const { hirableLevel, monologues } = CREW_MEMBERS[type];

      // Progress the monologue for all hired crew members.
      if (hireStatus === CrewStatus.Hired && monologueProgress < monologues.length - 1) {
        set(crew(type), (current) => ({
          ...current,
          monologueProgress: current.monologueProgress + 1,
        }));
      }

      // Make crew member hirable if the appropriate level has been reached.
      if (hireStatus === CrewStatus.Unavailable && nextLevel >= hirableLevel) {
        set(crew(type), (current) => ({
          ...current,
          hireStatus: CrewStatus.Hirable,
        }));

        if (!get(isShowingCrewHiring)) {
          set(isShowingCrewHiring, true);
        }
      }
    });

    if (!get(wildernesses)[nextLevel]) {
      set(wildernesses, (current) => [
        ...current,
        { name: generateLocation({ isNSFW: get(isNSFW), level: nextLevel }), progress: 0 },
      ]);
    }

    set(level, nextLevel);
  });
}
