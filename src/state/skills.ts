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
        Object.values(get(trainedSkills)).filter((current) => current).length,
      ),
    key,
  }),
);

export const trainedSkills = withStateKey("trainedSkills", (key) =>
  selector<Record<Skill, boolean>>({
    get: ({ get }) => ({
      anatomy: get(isSkillAcquired("anatomy")),
      archery: get(isSkillAcquired("archery")),
      armorcraft: get(isSkillAcquired("armorcraft")),
      assassination: get(isSkillAcquired("assassination")),
      calisthenics: get(isSkillAcquired("calisthenics")),
      escrime: get(isSkillAcquired("escrime")),
      evasion: get(isSkillAcquired("evasion")),
      shieldcraft: get(isSkillAcquired("shieldcraft")),
      siegecraft: get(isSkillAcquired("siegecraft")),
      traumatology: get(isSkillAcquired("traumatology")),
    }),
    key,
  }),
);

// ATOMS

export const isSkillAcquired = withStateKey("isSkillAcquired", (key) =>
  atomFamily<boolean, Skill>({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
