import { atom, selector } from "recoil"

import { LABEL_UNKNOWN } from "@neverquest/data/general"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { ownedItem } from "@neverquest/state/inventory"
import { ammunition } from "@neverquest/state/items"
import { health, stamina } from "@neverquest/state/reserves"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isRanged } from "@neverquest/types/type-guards"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const canAttackOrParry = withStateKey(`canAttackOrParry`, (key) =>
  selector({
    get: ({ get }) => {
      const staminaValue = get(stamina)

      return staminaValue > 0 && staminaValue >= get(weapon).burden
    },
    key,
  }),
)

export const canBlockOrStagger = withStateKey(`canBlockOrStagger`, (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(shield).burden,
    key,
  }),
)

export const canDodge = withStateKey(`canDodge`, (key) =>
  selector({
    get: ({ get }) => get(isTraitAcquired(`stalwart`)) || get(stamina) >= get(armor).burden,
    key,
  }),
)

export const canResurrect = withStateKey(`canResurrect`, (key) =>
  selector({
    get: ({ get }) => get(hasFlatlined) && get(ownedItem(`phylactery`)) !== undefined,
    key,
  }),
)

export const hasEnoughAmmunition = withStateKey(`hasEnoughAmmunition`, (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon)

      return isRanged(weaponValue) ? get(ammunition) >= weaponValue.ammunitionCost : true
    },
    key,
  }),
)

export const hasFlatlined = withStateKey(`hasFlatlined`, (key) =>
  selector({
    get: ({ get }) => get(health) === 0,
    key,
  }),
)

export const isLooting = withStateKey(`isLooting`, (key) =>
  selector({
    get: ({ get }) => get(lootingDuration) > 0,
    key,
  }),
)

export const isRecovering = withStateKey(`isRecovering`, (key) =>
  selector({
    get: ({ get }) => get(recoveryDuration) > 0,
    key,
  }),
)

// ATOMS

export const attackDuration = withStateKey(`attackDuration`, (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const isAttacking = withStateKey(`isAttacking`, (key) =>
  atom({
    default: false,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const lootingDuration = withStateKey(`lootingDuration`, (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const name = withStateKey(`name`, (key) =>
  atom({
    default: LABEL_UNKNOWN,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const recoveryDuration = withStateKey(`recoveryDuration`, (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const statusElement = withStateKey(`statusElement`, (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleStorage({ key })],
    key,
  }),
)
