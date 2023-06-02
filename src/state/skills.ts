import { atomFamily, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { Skill } from "@neverquest/types/enums";

// SELECTORS

export const skillsTrained = withStateKey("skillsTrained", (key) =>
  selector<Record<Skill, boolean>>({
    get: ({ get }) => ({
      [Skill.Armorcraft]: get(skills(Skill.Armorcraft)),
      [Skill.Anatomy]: get(skills(Skill.Anatomy)),
      [Skill.Assassination]: get(skills(Skill.Assassination)),
      [Skill.Evasion]: get(skills(Skill.Evasion)),
      [Skill.Escrime]: get(skills(Skill.Escrime)),
      [Skill.Calisthenics]: get(skills(Skill.Calisthenics)),
      [Skill.Shieldcraft]: get(skills(Skill.Shieldcraft)),
      [Skill.Traumatology]: get(skills(Skill.Traumatology)),
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
