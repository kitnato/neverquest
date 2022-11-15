import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { KEY_SESSION } from "@neverquest/constants";
import { ATTRIBUTES_INITIAL } from "@neverquest/constants/attributes";
import { CREW_INITIAL } from "@neverquest/constants/caravan";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import {
  currentHealth,
  currentStamina,
  maximumHealth,
  maximumStamina,
} from "@neverquest/state/reserves";
import { CrewStatus } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const createMonster = useCreateMonster();

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    if (ls.get(KEY_SESSION) !== null) {
      return;
    }

    set(currentHealth, get(maximumHealth));
    set(currentStamina, get(maximumStamina));
    createMonster();

    ATTRIBUTES_INITIAL.forEach((type) =>
      set(attributes(type), (current) => ({ ...current, isUnlocked: true }))
    );

    CREW_INITIAL.forEach((type) =>
      set(crew(type), (current) => ({
        ...current,
        hireStatus: CrewStatus.Hired,
      }))
    );
  });
}
