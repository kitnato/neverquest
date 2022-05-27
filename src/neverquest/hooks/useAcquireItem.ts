import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";

import { Equipment } from "neverquest/types/core";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import useEquipItem from "neverquest/hooks/useEquipItem";
import { armor, inventory, shield, trinket, weapon } from "neverquest/state/inventory";
import { autoEquip } from "neverquest/state/global";
import { showInventoryButton } from "neverquest/state/show";
import { NO_ARMOR, NO_SHIELD, NO_TRINKET, NO_WEAPON } from "neverquest/utilities/constants";
import { isTrinket, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useAcquireItem() {
  const checkEncumbrance = useCheckEncumbrance();
  const equipItem = useEquipItem();
  const [showInventoryButtonValue, setShowInventoryButton] = useAtom(showInventoryButton);
  const armorValue = useAtomValue(armor);
  const autoEquipValue = useAtomValue(autoEquip);
  const shieldValue = useAtomValue(shield);
  const trinketValue = useAtomValue(trinket);
  const weaponValue = useAtomValue(weapon);
  const setInventory = useSetAtom(inventory);

  return ({ item }: { item: Equipment }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    const id = Symbol();
    const key = nanoid();

    setInventory((current) => ({
      ...current,
      [id]: { item, key },
    }));

    if (
      autoEquipValue &&
      ((armorValue === NO_ARMOR && isArmor(item)) ||
        (shieldValue === NO_SHIELD && isShield(item)) ||
        (weaponValue === NO_WEAPON && isWeapon(item)) ||
        (trinketValue === NO_TRINKET && isTrinket(item)))
    ) {
      equipItem({ id, item });
    }

    if (!showInventoryButtonValue) {
      setShowInventoryButton(true);
    }

    return true;
  };
}
