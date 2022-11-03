import ls from "localstorage-slim";
import { selector } from "recoil";

import { monsterCreate } from "./monster";
import { KEY_SESSION } from "@neverquest/constants";
import { ATTRIBUTES_INITIAL } from "@neverquest/constants/attributes";
import { CREW_INITIAL } from "@neverquest/constants/caravan";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import {
  currentHealth,
  currentStamina,
  maximumHealth,
  maximumStamina,
} from "@neverquest/state/reserves";
import { CrewStatus } from "@neverquest/types/enums";

export const initialization = selector({
  get: () => null,
  key: "initialization",
  set: ({ get, set }) => {
    if (ls.get(KEY_SESSION) !== null) {
      return;
    }

    set(currentHealth, get(maximumHealth));
    set(currentStamina, get(maximumStamina));
    set(monsterCreate, null);

    ATTRIBUTES_INITIAL.forEach((type) =>
      set(attributes(type), (current) => ({ ...current, isUnlocked: true }))
    );

    CREW_INITIAL.forEach((type) =>
      set(crew(type), (current) => ({
        ...current,
        hireStatus: CrewStatus.Hired,
      }))
    );
  },
});
