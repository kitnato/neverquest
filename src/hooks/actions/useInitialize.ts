import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CREW } from "@neverquest/data/caravan";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { attributes } from "@neverquest/state/attributes";
import { hireStatus } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import type { Attribute, Crew } from "@neverquest/types/unions";
import { KEY_SESSION } from "@neverquest/utilities/constants";
import { generateWilderness } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (ls.get(KEY_SESSION) !== null) {
          return;
        }

        Object.entries(ATTRIBUTES).forEach(([type, { isUnlocked }]) =>
          set(attributes(type as Attribute), (current) => ({ ...current, isUnlocked }))
        );

        Object.entries(CREW).forEach(([type, { requiredStage }]) => {
          if (requiredStage === 0) {
            set(hireStatus(type as Crew), { status: "hired" });
          }
        });

        set(wildernesses, [generateWilderness({ allowNSFW: get(allowNSFW), stage: get(stage) })]);

        generateMonster();
      },
    [generateMonster]
  );
}
