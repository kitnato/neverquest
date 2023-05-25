import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { ATTRIBUTES_INITIAL } from "@neverquest/data/attributes";
import { CREW_INITIAL } from "@neverquest/data/caravan";
import { KEY_SESSION } from "@neverquest/data/constants";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import { level, wildernesses } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { CrewStatus } from "@neverquest/types/enums";
import { generateLocation } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const createMonster = useGenerateMonster();

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

        set(wildernesses, [generateLocation({ allowNSFW: get(allowNSFW), level: get(level) })]);

        createMonster();
      },
    [createMonster]
  );
}
