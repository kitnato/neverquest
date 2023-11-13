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
import { ATTRIBUTE_TYPES, CREW_TYPES } from "@neverquest/types/unions";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (isRetirement?: boolean) => {
        const get = getSnapshotGetter(snapshot);

        const isStoreEmpty = ls.get(KEY_SESSION) === null;

        if (isRetirement || isStoreEmpty) {
          const initialStore: Record<string, boolean | string> = {};

          for (const attribute of ATTRIBUTE_TYPES) {
            const { isUnlocked } = ATTRIBUTES[attribute];

            set(isAttributeUnlocked(attribute), isUnlocked);

            initialStore[`isAttributeUnlocked-${attribute}`] = isUnlocked;
          }

          for (const crew of CREW_TYPES) {
            const status = CREW[crew].requiredStage === 0 ? "hired" : "hidden";

            set(hireStatus(crew), status);

            initialStore[`hireStatus-${crew}`] = status;
          }

          // TODO - onSet in handleLocalStorage does not fire properly for initial changes to string and boolean-type Atoms.
          if (isStoreEmpty) {
            ls.set(KEY_SESSION, initialStore);
          }

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
