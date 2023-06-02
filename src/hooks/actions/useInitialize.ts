import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CREW } from "@neverquest/data/caravan";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import { CrewStatus } from "@neverquest/types/enums";
import { KEY_SESSION } from "@neverquest/utilities/constants";
import { generateWilderness } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInitialize() {
  const createMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);

        if (ls.get(KEY_SESSION) !== null) {
          return;
        }

        Object.entries(ATTRIBUTES).forEach(([type, { isUnlocked }]) =>
          set(attributes(Number(type)), (current) => ({ ...current, isUnlocked }))
        );

        Object.entries(CREW).forEach(([type, { requiredStage }]) => {
          if (requiredStage <= stageValue) {
            set(crew(Number(type)), (current) => ({
              ...current,
              hireStatus: CrewStatus.Hired,
            }));
          }
        });

        set(wildernesses, [generateWilderness({ allowNSFW: get(allowNSFW), stage: stageValue })]);

        createMonster();
      },
    [createMonster]
  );
}
