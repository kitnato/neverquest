import { atom, selector } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { crew, merchantInventoryGeneration } from "@neverquest/state/caravan";
import { monsterCreate } from "@neverquest/state/monster";
import {
  currentHealth,
  maximumHealth,
  currentStamina,
  maximumStamina,
} from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { CrewStatus, SkillStatus } from "@neverquest/types/enums";
import { ATTRIBUTES_INITIAL } from "@neverquest/utilities/constants-attributes";
import { CREW_INITIAL } from "@neverquest/utilities/constants-caravan";
import { SKILLS_INITIAL } from "@neverquest/utilities/constants-skills";

export const autoEquip = atom({
  default: true,
  key: "autoEquip",
});

export const isGameOver = atom({
  default: false,
  key: "isGameOver",
});

export const lowHealthWarning = atom({
  default: true,
  key: "lowHealthWarning",
});

export const nsfw = atom({
  default: true,
  key: "nsfw",
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const initialization = selector({
  get: () => null,
  key: "initialization",
  set: ({ get, set }) => {
    set(currentHealth, get(maximumHealth));
    set(currentStamina, get(maximumStamina));
    set(merchantInventoryGeneration, null);
    set(monsterCreate, null);

    ATTRIBUTES_INITIAL.forEach((type) =>
      set(attributes(type), (current) => ({ ...current, canAssign: true }))
    );

    CREW_INITIAL.forEach((type) =>
      set(crew(type), (current) => ({ ...current, hireStatus: CrewStatus.Hired }))
    );

    SKILLS_INITIAL.forEach((type) => set(skills(type), SkillStatus.Trainable));
  },
});
