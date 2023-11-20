import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CREW } from "@neverquest/data/caravan";
import { KEY_SESSION } from "@neverquest/data/general";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { isAttributeUnlocked } from "@neverquest/state/attributes";
import { hireStatus } from "@neverquest/state/caravan";
import { wildernesses } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { ATTRIBUTE_TYPES, CREW_TYPES } from "@neverquest/types/unions";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (isRetirement?: boolean) => {
        const get = getSnapshotGetter(snapshot);

        const isStoreEmpty = ls.get(KEY_SESSION) === null;

        if (isRetirement ?? isStoreEmpty) {
          const initialStore: Record<string, string[] | boolean | string> = {};

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

          const newWilderness = [
            generateLocation({
              allowProfanity: get(allowProfanity),
              nameStructure: getNameStructure(),
            }),
          ];

          set(wildernesses, newWilderness);

          initialStore.wildernesses = newWilderness;

          if (isStoreEmpty) {
            ls.set(KEY_SESSION, initialStore);
          }
        }
      },
    [],
  );
}
