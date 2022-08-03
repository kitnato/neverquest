import ls from "localstorage-slim";
import { atom, selector } from "recoil";

import { ATTRIBUTES_INITIAL } from "@neverquest/constants/attributes";
import { CREW_INITIAL } from "@neverquest/constants/caravan";
import { SKILLS_INITIAL } from "@neverquest/constants/skills";
import { attributes } from "@neverquest/state/attributes";
import { crew, merchantInventoryGeneration } from "@neverquest/state/caravan";
import { localStorageEffect } from "@neverquest/state/effects";
import { monsterCreate } from "@neverquest/state/monster";
import {
  currentHealth,
  maximumHealth,
  currentStamina,
  maximumStamina,
} from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { CrewStatus, SkillStatus, StorageKey } from "@neverquest/types/enums";
import { KEY_SESSION } from "@neverquest/constants";

// ATOMS

export const autoEquip = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.AutoEquip, true)],
  key: StorageKey.AutoEquip,
});

export const isGameOver = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsGameOver)],
  key: StorageKey.IsGameOver,
});

export const isNSFW = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.NSFW, true)],
  key: StorageKey.NSFW,
});

export const isShowingDamagePerSecond = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsShowingDamagePerSecond, true)],
  key: StorageKey.IsShowingDamagePerSecond,
});

export const lowHealthWarning = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.LowHealthWarning, true)],
  key: StorageKey.LowHealthWarning,
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const initialization = selector({
  get: () => null,
  key: "initialization",
  set: ({ get, set }) => {
    if (ls.get(KEY_SESSION) !== null) {
      return;
    }

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
