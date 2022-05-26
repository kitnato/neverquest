import { useSetAtom, useAtom } from "jotai";

import { stamina, staminaRegenerationRate } from "neverquest/state/attributes";
import { accessory, armor, inventory, shield, weapon } from "neverquest/state/inventory";
import {
  showAccessory,
  showArmor,
  showBlockChance,
  showShield,
  showStamina,
  showTotalAttackRateSummary,
  showTotalDamageSummary,
  showTotalProtection,
  showWeapon,
} from "neverquest/state/show";
import { InventoryProps } from "neverquest/types/props";
import { isAccessory, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useEquipItem() {
  const [showAccessoryValue, setShowAccessory] = useAtom(showAccessory);
  const [showArmorValue, setShowArmor] = useAtom(showArmor);
  const [showBlockChanceValue, setShowBlockChance] = useAtom(showBlockChance);
  const [showShieldValue, setShowShield] = useAtom(showShield);
  const [showStaminaValue, setShowStamina] = useAtom(showStamina);
  const [showTotalAttackRateBreakdownValue, setShowTotalAttackRateSummary] = useAtom(
    showTotalAttackRateSummary
  );
  const [showTotalDamageBreakdownValue, setShowTotalDamageSummary] =
    useAtom(showTotalDamageSummary);
  const [showTotalProtectionValue, setShowTotalProtection] = useAtom(showTotalProtection);
  const [showWeaponValue, setShowWeapon] = useAtom(showWeapon);
  const [staminaValue, setStamina] = useAtom(stamina);
  const [staminaRegenerationRateValue, setStaminaRegenerationRate] =
    useAtom(staminaRegenerationRate);
  const setArmor = useSetAtom(armor);
  const setAccessory = useSetAtom(accessory);
  const setShield = useSetAtom(shield);
  const setInventory = useSetAtom(inventory);
  const setWeapon = useSetAtom(weapon);

  return ({ id, item }: InventoryProps) => {
    if (isAccessory(item)) {
      setAccessory(item);

      if (!showAccessoryValue) {
        setShowAccessory(true);
      }
    }

    if (isArmor(item)) {
      setArmor(item);

      if (!showArmorValue) {
        setShowArmor(true);
      }

      if (!showTotalProtectionValue) {
        setShowTotalProtection(true);
      }
    }

    if (isShield(item)) {
      setShield(item);

      if (!showShieldValue) {
        setShowShield(true);
      }

      if (!showBlockChanceValue) {
        setShowBlockChance(true);
      }
    }

    if (isWeapon(item)) {
      setWeapon(item);

      if (!showStaminaValue && item.staminaCost > 0) {
        setShowStamina(true);

        if (!staminaValue.canAssign) {
          setStamina((current) => ({ ...current, canAssign: true }));
        }

        if (!staminaRegenerationRateValue.canAssign) {
          setStaminaRegenerationRate((current) => ({
            ...current,
            canAssign: true,
          }));
        }
      }

      if (!showTotalAttackRateBreakdownValue) {
        setShowTotalAttackRateSummary(true);
      }

      if (!showTotalDamageBreakdownValue) {
        setShowTotalDamageSummary(true);
      }

      if (!showWeaponValue) {
        setShowWeapon(true);
      }
    }

    setInventory((current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: true },
    }));
  };
}
