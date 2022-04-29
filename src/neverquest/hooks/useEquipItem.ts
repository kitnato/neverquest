import { useSetRecoilState, useRecoilState } from "recoil";

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
import { InventoryContentProps } from "neverquest/types/props";
import { isAccessory, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useEquipItem() {
  const [showAccessoryValue, setShowAccessory] = useRecoilState(showAccessory);
  const [showArmorValue, setShowArmor] = useRecoilState(showArmor);
  const [showBlockChanceValue, setShowBlockChance] = useRecoilState(showBlockChance);
  const [showShieldValue, setShowShield] = useRecoilState(showShield);
  const [showStaminaValue, setShowStamina] = useRecoilState(showStamina);
  const [showTotalAttackRateBreakdownValue, setShowTotalAttackRateSummary] = useRecoilState(
    showTotalAttackRateSummary
  );
  const [showTotalDamageBreakdownValue, setShowTotalDamageSummary] =
    useRecoilState(showTotalDamageSummary);
  const [showTotalProtectionValue, setShowTotalProtection] = useRecoilState(showTotalProtection);
  const [showWeaponValue, setShowWeapon] = useRecoilState(showWeapon);
  const [staminaValue, setStamina] = useRecoilState(stamina);
  const [staminaRegenerationRateValue, setStaminaRegenerationRate] =
    useRecoilState(staminaRegenerationRate);
  const setArmor = useSetRecoilState(armor);
  const setAccessory = useSetRecoilState(accessory);
  const setShield = useSetRecoilState(shield);
  const setInventory = useSetRecoilState(inventory);
  const setWeapon = useSetRecoilState(weapon);

  return ({ key, item }: InventoryContentProps) => {
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
          setStamina((currentStamina) => ({ ...currentStamina, canAssign: true }));
        }

        if (!staminaRegenerationRateValue.canAssign) {
          setStaminaRegenerationRate((currentStaminaRegenerationRate) => ({
            ...currentStaminaRegenerationRate,
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

    setInventory((currentInventory) => ({
      ...currentInventory,
      [key]: { ...currentInventory[key], isEquipped: true },
    }));
  };
}
