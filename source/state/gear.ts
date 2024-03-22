import { atom, atomFamily, selector } from "recoil"

import {
	ARMOR_NONE,
	SHIELD_ELEMENTAL_EFFECTS_BASE,
	SHIELD_NONE,
	WEAPON_NONE,
} from "@neverquest/data/gear"
import { powerLevel } from "@neverquest/state/attributes"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { isTraitAcquired } from "@neverquest/state/traits"
import type { Armor, GemItem, Shield, Weapon } from "@neverquest/types"
import { isMelee, isUnarmed } from "@neverquest/types/type-guards"
import { getGearElementalEffects, getTotalElementalEffects } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const elementalEffects = withStateKey("elementalEffects", key =>
	selector({
		get: ({ get }) => {
			const armorValue = get(armor)
			const powerLevelValue = get(powerLevel)
			const shieldValue = get(shield)
			const weaponValue = get(weapon)

			const armorEffects = getGearElementalEffects({
				gear: armorValue,
				gems: get(gems(armorValue.ID)),
				powerLevel: powerLevelValue,
			})
			// Only apply shield effects if they're actively used.
			const shieldEffects
				= (isMelee(weaponValue) || isUnarmed(weaponValue)) && (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))
					? getGearElementalEffects({
						gear: shieldValue,
						gems: get(gems(shieldValue.ID)),
						powerLevel: powerLevelValue,
					})
					: SHIELD_ELEMENTAL_EFFECTS_BASE
			const weaponEffects = getGearElementalEffects({
				gear: weaponValue,
				gems: get(gems(weaponValue.ID)),
				powerLevel: powerLevelValue,
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
