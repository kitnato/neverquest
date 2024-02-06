import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { isRelicEquipped } from "@neverquest/state/items";
import { questProgress } from "@neverquest/state/quests";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isShowing } from "@neverquest/state/ui";
import type { GearItem, RelicItem } from "@neverquest/types";
import {
  isArmor,
  isMelee,
  isRanged,
  isRelicItem,
  isShield,
  isUnshielded,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipItem() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ forceEquip, item }: { forceEquip?: boolean; item: GearItem | RelicItem }) => {
        const get = getSnapshotGetter(snapshot);

        if (isRelicItem(item)) {
          set(isRelicEquipped(item.name), (isEquipped) => forceEquip ?? !isEquipped);

          return;
        }
        const armorValue = get(armor);
        const shieldValue = get(shield);
        const weaponValue = get(weapon);

        const { burden, gearClass, ID } = item;
        const isWeaponRanged = isRanged(item);
        // eslint-disable-next-line unicorn/consistent-destructuring
        const isWeaponTwoHanded = isMelee(item) && item.grip === "two-handed";

        if (isArmor(item)) {
          if (gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
            return;
          }

          if (forceEquip === undefined) {
            if (ID === armorValue.ID) {
              reset(armor);
            } else {
              set(armor, item);
            }
          } else {
            if (forceEquip) {
              set(armor, item);
            } else {
              if (ID === armorValue.ID) {
                reset(armor);
              }
            }
          }

          set(isShowing("armor"), true);
          set(isShowing("protection"), true);

          progressQuest({ quest: "equippingArmor" });
        }

        if (isShield(item)) {
          if (gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
            return;
          }

          if (forceEquip === undefined) {
            if (ID === shieldValue.ID) {
              reset(shield);
            } else {
              set(shield, item);
            }
          } else {
            if (forceEquip) {
              set(shield, item);
            } else {
              if (ID === shieldValue.ID) {
                reset(shield);
              }
            }
          }

          // Equipping a shield while a ranged or two-handed weapon is equipped un-equips the weapon (unless it's two-handed and the colossus trait is acquired).
          if (
            (isMelee(weaponValue) &&
              weaponValue.grip === "two-handed" &&
              !get(isTraitAcquired("colossus"))) ||
            isRanged(weaponValue)
          ) {
            reset(weapon);
          }

          set(isShowing("offhand"), true);

          progressQuest({ quest: "equippingShield" });
        }

        if (isWeapon(item)) {
          if (isWeaponTwoHanded && !get(isSkillAcquired("siegecraft"))) {
            return;
          }

          if (isRanged(item) && !get(isSkillAcquired("archery"))) {
            return;
          }

          if (forceEquip === undefined) {
            if (ID === weaponValue.ID) {
              reset(weapon);
            } else {
              set(weapon, item);
            }
          } else {
            if (forceEquip) {
              set(weapon, item);
            } else {
              if (ID === weaponValue.ID) {
                reset(weapon);
              }
            }
          }

          // Equipping a ranged or two-handed weapon while a shield is equipped un-equips the shield.
          if (
            (isWeaponRanged || (isWeaponTwoHanded && !get(isTraitAcquired("colossus")))) &&
            !isUnshielded(shieldValue)
          ) {
            reset(shield);
          }

          if (isWeaponRanged || isWeaponTwoHanded) {
            set(isShowing("offhand"), true);
          }

          set(isShowing("damage"), true);
          set(isShowing("weapon"), true);

          progressQuest({ quest: "equippingWeapon" });
        }

        if (burden > 0) {
          set(isShowing("stamina"), true);
        }

        reset(questProgress("survivingNoGear"));
      },
    [progressQuest],
  );
}
