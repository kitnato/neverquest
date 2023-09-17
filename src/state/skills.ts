import { atomFamily, selector } from "recoil";

import { SKILL_PRICE_BASE, SKILL_PRICE_FACTOR } from "@neverquest/data/skills";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Skill } from "@neverquest/types/unions";

// SELECTORS

export const skillPrice = withStateKey("skillPrice", (key) =>
  selector({
    get: ({ get }) =>
      SKILL_PRICE_BASE *
      Math.pow(
        SKILL_PRICE_FACTOR,
        Object.values(get(skillsTrained)).filter((current) => current).length,
      ),
    key,
  }),
);

export const skillsTrained = withStateKey("skillsTrained", (key) =>
  selector<Record<Skill, boolean>>({
    get: ({ get }) => ({
      anatomy: get(skills("anatomy")),
      archery: get(skills("archery")),
      armorcraft: get(skills("armorcraft")),
      assassination: get(skills("assassination")),
      calisthenics: get(skills("calisthenics")),
      escrime: get(skills("escrime")),
      evasion: get(skills("evasion")),
      shieldcraft: get(skills("shieldcraft")),
      siegecraft: get(skills("siegecraft")),
      traumatology: get(skills("traumatology")),
    }),
    key,
  }),
);

// ATOMS

export const skills = withStateKey("skills", (key) =>
  atomFamily<boolean, Skill>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  }),
);
