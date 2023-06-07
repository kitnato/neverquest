import { atomFamily, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Skill } from "@neverquest/types/unions";

// SELECTORS

export const skillsTrained = withStateKey("skillsTrained", (key) =>
  selector<Record<Skill, boolean>>({
    get: ({ get }) => ({
      anatomy: get(skills("anatomy")),
      armorcraft: get(skills("armorcraft")),
      assassination: get(skills("assassination")),
      calisthenics: get(skills("calisthenics")),
      escrime: get(skills("escrime")),
      evasion: get(skills("evasion")),
      shieldcraft: get(skills("shieldcraft")),
      traumatology: get(skills("traumatology")),
    }),
    key,
  })
);
``;

// ATOMS

export const skills = withStateKey("skills", (key) =>
  atomFamily<boolean, Skill>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);
