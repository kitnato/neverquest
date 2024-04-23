import { atom, atomFamily, selector } from "recoil"

import {
	ARMOR_NONE,
	SHIELD_ELEMENTAL_EFFECTS_BASE,
	SHIELD_NONE,
	WEAPON_NONE,
} from "@neverquest/data/gear"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isMelee, isUnarmed } from "@neverquest/types/type-guards"
import { getElementalEffects, getTotalElementalEffects } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { Armor, GemItem, Shield, Weapon } from "@neverquest/types"

// SELECTORS

export const elementalEffects = withStateKey("elementalEffects", key =>
	selector({
		get: ({ get }) => {
			const armorValue = get(armor)
			const shieldValue = get(shield)
			const weaponValue = get(weapon)

			const armorEffects = getElementalEffects({
				gear: armorValue,
				gems: get(gems(armorValue.ID)),
			})
			// Only apply shield effects if they're actively used.
			const shieldEffects
				= (isMelee(weaponValue) || isUnarmed(weaponValue)) && (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))
					? getElementalEffects({
						gear: shieldValue,
						gems: get(gems(shieldValue.ID)),
					})
					: SHIELD_ELEMENTAL_EFFECTS_BASE
			const weaponEffects = getElementalEffects({
				gear: weaponValue,
				gems: get(gems(weaponValue.ID)),
			})

			return {
				armor: {
					fire: getTotalElementalEffects({ ...armorEffects.fire, modifier: shieldEffects.fire }),
					ice: getTotalElementalEffects({ ...armorEffects.ice, modifier: shieldEffects.ice }),
					lightning: getTotalElementalEffects({
						...armorEffects.lightning,
						modifier: shieldEffects.lightning,
					}),
				},
				weapon: {
					fire: getTotalElementalEffects({ ...weaponEffects.fire, modifier: shieldEffects.fire }),
					ice: getTotalElementalEffects({ ...weaponEffects.ice, modifier: shieldEffects.ice }),
					lightning: getTotalElementalEffects({
						...weaponEffects.lightning,
						modifier: shieldEffects.lightning,
					}),
				},
			}
		},
		key,
	}),
)

// ATOMS

export const armor = withStateKey("armor", key =>
	atom<Armor | typeof ARMOR_NONE>({
		default: ARMOR_NONE,
		effects: [handleStorage({ key })],
		key,
	}),
)

// TODO - using UIDs as parameters causes memory leaks; they cannot be deleted once the UID reference is lost (e.g. discarding item).
export const gems = withStateKey("gems", key =>
	atomFamily<GemItem[], string>({
		default: [],
		effects: ID => [handleStorage({ key, parameter: ID })],
		key,
	}),
)

export const shield = withStateKey("shield", key =>
	atom<Shield | typeof SHIELD_NONE>({
		default: SHIELD_NONE,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const weapon = withStateKey("weapon", key =>
	atom<Weapon | typeof WEAPON_NONE>({
		default: WEAPON_NONE,
		effects: [handleStorage({ key })],
		key,
	}),
)
