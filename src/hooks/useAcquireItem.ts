import { nanoid } from "nanoid";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ITEM_KNAPSACK } from "@neverquest/constants/items";
import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "@neverquest/constants/gear";
import useCheckEncumbrance from "@neverquest/hooks/useCheckEncumbrance";
import { hasKnapsack } from "@neverquest/state/character";
import { armor, encumbranceMaximum, inventory, shield, weapon } from "@neverquest/state/inventory";
import { autoEquip } from "@neverquest/state/settings";
import { itemEquip } from "@neverquest/state/transactions";
import { Gear, Item } from "@neverquest/types";
import { isArmor, isItem, isShield, isWeapon } from "@neverquest/types/type-guards";

export default function () {
  const armorValue = useRecoilValue(armor);
  const autoEquipValue = useRecoilValue(autoEquip);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const setEncumbranceMaximum = useSetRecoilState(encumbranceMaximum);
  const setHasKnapsack = useSetRecoilState(hasKnapsack);
  const setInventory = useSetRecoilState(inventory);
  const equipItem = useSetRecoilState(itemEquip);

  const checkEncumbrance = useCheckEncumbrance();

  return ({ item }: { item: Gear | Item }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    if (item.name === ITEM_KNAPSACK.name) {
      setEncumbranceMaximum((current) => current + 1);
      setHasKnapsack(true);
    }

    if (isItem(item) && !item.isPortable) {
      return true;
    }

    const id = Symbol();
    const key = nanoid();

    setInventory((current) => ({
      ...current,
      [id]: { isEquipped: false, item, key },
    }));

    if (
      autoEquipValue &&
      ((armorValue === NO_ARMOR && isArmor(item)) ||
        (shieldValue === NO_SHIELD && isShield(item)) ||
        (weaponValue === NO_WEAPON && isWeapon(item)))
    ) {
      equipItem(id);
    }

    return true;
  };
}
