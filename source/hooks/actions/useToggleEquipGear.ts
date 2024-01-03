import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { GearItem } from "@neverquest/types";
import {
  isArmor,
  isMelee,
  isRanged,
  isShield,
  isUnshielded,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (gearItem: GearItem) => {
        const get = getSnapshotGetter(snapshot);

        const shieldValue = get(shield);
        const weaponValue = get(weapon);

        const { burden, gearClass, ID } = gearItem;
        const isWeaponRanged = isRanged(gearItem);
        // eslint-disable-next-line unicorn/consistent-destructuring
        const isWeaponTwoHanded = isMelee(gearItem) && gearItem.grip === "two-handed";

        if (isArmor(gearItem)) {
          if (gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
            return;
          }

          set(isShowing("armor"), true);
          set(isShowing("protection"), true);

          progressQuest({ quest: "equippingArmor" });
        }

        if (isShield(gearItem)) {
          if (gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
            return;
          }

          set(isShowing("blockChance"), true);
          set(isShowing("offhand"), true);
          set(isShowing("stamina"), true);

          progressQuest({ quest: "equippingShield" });
        }

        if (isWeapon(gearItem)) {
          if (isWeaponTwoHanded && !get(isSkillAcquired("siegecraft"))) {
            return;
          }

          if (isRanged(gearItem) && !get(isSkillAcquired("archery"))) {
            return;
          }

          if (burden > 0) {
            set(isShowing("stamina"), true);
          }

          if (isWeaponRanged || isWeaponTwoHanded) {
            set(isShowing("offhand"), true);
          }

          set(isShowing("attackRateDetails"), true);
          set(isShowing("damageDetails"), true);
          set(isShowing("weapon"), true);

          progressQuest({ quest: "equippingWeapon" });
        }

        reset(questProgress("survivingNoGear"));

        if (isArmor(gearItem)) {
          if (ID === get(armor).ID) {
            reset(armor);
          } else {
            set(armor, gearItem);
          }
        }

        if (isShield(gearItem)) {
          if (ID === shieldValue.ID) {
            reset(shield);
          } else {
            set(shield, gearItem);
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
        }

        if (isWeapon(gearItem)) {
          if (ID === weaponValue.ID) {
            reset(weapon);
          } else {
            set(weapon, gearItem);
          }

          // Equipping a ranged or two-handed weapon while a shield is equipped un-equips the shield.
          if ((isWeaponRanged || isWeaponTwoHanded) && !isUnshielded(shieldValue)) {
            reset(shield);
          }
        }
      },
    [progressQuest],
  );
}
