import { generateLocation } from "@kitnato/locran";
import ls from "localstorage-slim";
import { useRecoilCallback } from "recoil";

import { CREW } from "@neverquest/data/caravan";
import { KEY_SESSION } from "@neverquest/data/general";
import { isHired } from "@neverquest/state/caravan";
import { wildernesses } from "@neverquest/state/encounter";
import { isSkillAcquired } from "@neverquest/state/skills";
import { CREW_MEMBER_TYPES } from "@neverquest/types/unions";
import { getAffixStructure } from "@neverquest/utilities/getters";

export function useInitialize() {
  return useRecoilCallback(
    ({ set }) =>
      (isRetirement?: boolean) => {
        const isStoreEmpty = ls.get(KEY_SESSION) === null;

        if (isRetirement ?? isStoreEmpty) {
          const initialStore: Record<string, string[] | boolean | string> = {};

          // TODO - limitation of hooks since requiredSkill is checked for every attribute, if an attribute has none, it must still call isSkillAcquired for a non-existent skill.
          set(isSkillAcquired("none"), true);
          initialStore["isSkillAcquired-none"] = true;

          for (const crewMember of CREW_MEMBER_TYPES) {
            const isCrewMemberMemberHired = CREW[crewMember].requiredStage === 1;

            set(isHired(crewMember), isCrewMemberMemberHired);
            initialStore[`isHired-${crewMember}`] = isCrewMemberMemberHired;
          }

          const newWilderness = [generateLocation({ affixStructure: getAffixStructure() })];

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
