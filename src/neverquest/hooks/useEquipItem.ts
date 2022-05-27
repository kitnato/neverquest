import { useSetAtom, useAtom } from "jotai";

import { stamina, staminaRegenerationRate } from "neverquest/state/attributes";
import { armor, inventory, shield, trinket, weapon } from "neverquest/state/inventory";
import {
  showArmor,
  showBlockChance,
  showShield,
  showStamina,
  showTotalAttackRateSummary,
  showTotalDamageSummary,
  showTotalProtection,
  showTrinket,
  showWeapon,
} from "neverquest/state/show";
import { InventoryProps } from "neverquest/types/props";
import { isArmor, isShield, isTrinket, isWeapon } from "neverquest/utilities/type-guards";

export default function useEquipItem() {
  const [showArmorValue, setShowArmor] = useAtom(showArmor);
  const [showBlockChanceValue, setShowBlockChance] = useAtom(showBlockChance);
  const [showShieldValue, setShowShield] = useAtom(showShield);
  const [showStaminaValue, setShowStamina] = useAtom(showStamina);
  const [showTrinketValue, setShowTrinket] = useAtom(showTrinket);
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
  const setInventory = useSetAtom(inventory);
  const setShield = useSetAtom(shield);
  const setTrinket = useSetAtom(trinket);
  const setWeapon = useSetAtom(weapon);

  return ({ id, item }: InventoryProps) => {
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

    if (isTrinket(item)) {
      setTrinket(item);

      if (!showTrinketValue) {
        setShowTrinket(true);
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
