import { atomFamily, selector } from "recoil";

import { SKILL_PRICE_BASE, SKILL_PRICE_FACTOR } from "@neverquest/data/skills";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { SKILL_TYPES, type Skill } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

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
  selector({
    get: ({ get }) =>
      SKILL_TYPES.reduce(
        (aggregator, current) => ({ ...aggregator, [current]: get(isSkillAcquired(current)) }),
        {} as Record<Skill, boolean>,
      ),
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
