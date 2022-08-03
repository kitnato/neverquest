import { atom, DefaultValue, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { localStorageEffect } from "@neverquest/state/effects";
import { isShowing } from "@neverquest/state/isShowing";
import { isGameOver } from "@neverquest/state/global";
import { shield, weapon } from "@neverquest/state/inventory";
import { AttributeType, DeltaType, ShowingType, StorageKey } from "@neverquest/types/enums";
import { HealthChangeProps } from "@neverquest/types/props";
import { FloatingTextType } from "@neverquest/types/ui";

// ATOMS

export const currentHealth = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CurrentHealth)],
  key: StorageKey.CurrentHealth,
});

export const currentStamina = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CurrentStamina)],
  key: StorageKey.CurrentStamina,
});

// SELECTORS

export const canAttack = selector({
  key: "canAttack",
  get: ({ get }) => get(currentStamina) >= get(weapon).staminaCost,
});

export const canBlock = selector({
  key: "canBlock",
  get: ({ get }) => get(currentStamina) >= get(shield).staminaCost,
});

export const isHealthLow = selector({
  key: "isHealthLow",
  get: ({ get }) => get(currentHealth) <= Math.ceil(get(maximumHealth) * 0.33),
});

export const isHealthMaxedOut = selector({
  key: "isHealthMaxedOut",
  get: ({ get }) => get(currentHealth) >= get(maximumHealth),
});

export const isStaminaMaxedOut = selector({
  key: "isStaminaMaxedOut",
  get: ({ get }) => get(currentStamina) >= get(maximumStamina),
});

export const maximumHealth = selector({
  key: "maximumHealth",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Health));

    const { base, increment } = ATTRIBUTES[AttributeType.Health];

    return base + increment * points;
  },
});

export const maximumStamina = selector({
  key: "maximumStamina",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Stamina));

    const { base, increment } = ATTRIBUTES[AttributeType.Stamina];

    return base + increment * points;
  },
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const healthChange = selector<HealthChangeProps>({
  get: () => 0,
  key: "healthChange",
  set: ({ get, set }, change) => {
    if (change instanceof DefaultValue) {
      return;
    }

    const max = get(maximumHealth);
    const isSimpleDelta = typeof change === "number";
    const healthChange = isSimpleDelta ? change : change.delta;

    let newHealth = get(currentHealth) + healthChange;

    if (isSimpleDelta) {
      const isPositive = healthChange > 0;

      set(deltas(DeltaType.Health), {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? `+${healthChange}` : healthChange}`,
      });
    } else {
      set(deltas(DeltaType.Health), change.deltaContents);
    }

    if (newHealth <= 0) {
      newHealth = 0;
      set(isGameOver, true);
      set(isShowing(ShowingType.GameOver), true);
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(currentHealth, newHealth);
  },
});

export const staminaChange = selector({
  get: () => 0,
  key: "staminaChange",
  set: ({ get, set }, delta) => {
    if (delta instanceof DefaultValue) {
      return;
    }
    const max = get(maximumStamina);
    let newStamina = get(currentStamina) + delta;

    set(deltas(DeltaType.Stamina), {
      color: delta > 0 ? FloatingTextType.Positive : FloatingTextType.Negative,
      value: `${delta > 0 ? `+${delta}` : delta}`,
    });

    if (newStamina < 0) {
      newStamina = 0;
    }

    if (newStamina > max) {
      newStamina = max;
    }

    set(currentStamina, newStamina);
  },
});
