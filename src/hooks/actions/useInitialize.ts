import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CREW } from "@neverquest/data/caravan";
import { KEY_SESSION } from "@neverquest/data/general";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { isAttributeUnlocked } from "@neverquest/state/attributes";
import { hireStatus } from "@neverquest/state/caravan";
import { wildernesses } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { ATTRIBUTE_TYPES, CREW_TYPES, type CrewStatus } from "@neverquest/types/unions";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (ls.get(KEY_SESSION) === null) {
          ATTRIBUTE_TYPES.forEach((current) =>
            set(isAttributeUnlocked(current), { isUnlocked: ATTRIBUTES[current].isUnlocked }),
          );

          CREW_TYPES.forEach((current) =>
            set(hireStatus(current), {
              status: CREW[current].requiredStage === 0 ? ("hired" as CrewStatus) : null,
            }),
          );

          set(wildernesses, [
            generateLocation({
              allowNSFW: get(allowNSFW),
              nameStructure: getNameStructure(),
            }),
          ]);

          generateMonster();
        }
      },
    [generateMonster],
  );
}
