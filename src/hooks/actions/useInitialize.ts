import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { KEY_SESSION } from "@neverquest/constants";
import { ATTRIBUTES_INITIAL } from "@neverquest/data/attributes";
import { CREW_INITIAL } from "@neverquest/data/caravan";
import { useCreateMonster } from "@neverquest/hooks/actions/useCreateMonster";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import { level, wildernesses } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/settings";
import { CrewStatus } from "@neverquest/types/enums";
import { generateLocation } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const createMonster = useCreateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (ls.get(KEY_SESSION) !== null) {
          return;
        }

        ATTRIBUTES_INITIAL.forEach((type) =>
          set(attributes(type), (current) => ({ ...current, isUnlocked: true }))
        );

        CREW_INITIAL.forEach((type) =>
          set(crew(type), (current) => ({
            ...current,
            hireStatus: CrewStatus.Hired,
          }))
        );

        set(wildernesses, [
          { name: generateLocation({ isNSFW: get(isNSFW), level: get(level) }), progress: 0 },
        ]);

        createMonster();
      },
    [createMonster]
  );
}
